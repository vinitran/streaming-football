import React, {
    MutableRefObject,
    PropsWithChildren,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import styled from "styled-components";
import Hls from "hls.js";
import {
    resetPlayer,
    setBuffer,
    setFullscreen,
    setPlaying,
    setProgress,
    setWaiting,
} from "@lib/redux/reducer/player";
import { handleFullscreen } from "@lib/player/fullscreen";
import { convertToTimeCode, DEFAULT_TIMESTAMP } from "@lib/player";
import { useWatchlist } from "@lib/watchlist/context";
import { createContext, useContext } from "react";
import { PlayerProps } from "./Player";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@lib/redux";
import { useRouter } from "next/router";

export const HLS_VIDEO_DURATION = 888;

interface PlayerContextData {
    videoRef: MutableRefObject<HTMLVideoElement | null>;
    controlsActive: boolean;
    togglePlay: () => void;
    toggleFullscreen: () => void;
    currentTimeStamp: () => string;
    missingTimeStamp: () => string;
    timeStampFromAbs: (abs: number) => string;
    jumpToAbs: (abs: number) => void;
}

const getVideoUrl = (data: MatchDetailModule.PlayUrl[]) : string => {
    const fullHd = data.find(element => element.name === "FHD");
    if (fullHd !== undefined) {
        return  fullHd.url;
    }
    const fullHd1 = data.find(element => element.name === "FullHD");
    if (fullHd1 !== undefined) {
        return  fullHd1.url;
    }
    const hD = data.find(element => element.name === "HD");
    if (hD !== undefined) {
        return  hD.url;
    }
    return data[0].url;
}

const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

const Video = styled.video`
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    margin: auto;
    pointer-events: none;
    user-select: none;
`;

interface Match {
    status: number;
    data: MatchDetailModule.Data;
}

export const PlayerProvider: React.FC<PropsWithChildren<PlayerProps>> = ({
    show,
    fullscreenContainer,
    children,
}) => {
    const dispatch = useDispatch();
    const playing = useAppSelector(state => state.player.playing);
    const { loading: watchlistLoading, hasShowProgress, addProgressToWatchlist } = useWatchlist();
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [controlsActive, setControlsActive] = useState<boolean>(false);
    const router = useRouter();
    const [matche, setMatche] = useState<Match | null>(null);

    useEffect(() => {
        const { identifier } = router.query;

        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.vebo.xyz/api/match/${identifier}/meta`);
                const data = await response.json();

                setMatche(data); // Assuming the API returns an array of matches
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!videoRef.current || watchlistLoading || matche == null ) {
            return;
        }

        if (matche?.data == null){
            return;
        }

        if (matche?.data.play_urls == null){
            return;
        }

        if  (matche?.data.play_urls.length < 1) {
            return;
        }

        const url = getVideoUrl(matche?.data.play_urls);
        const updatedUrl = url ? url.replace(/playlist\.m3u8|index\.m3u8/g, "chunklist.m3u8") : "";
        const proxyUrl = `https://stream.vinitran1245612.workers.dev?apiurl=${updatedUrl}&is_m3u8=true`;

        if (!Hls.isSupported()) {
            videoRef.current.canPlayType('application/vnd.apple.mpegurl');
            videoRef.current.src = proxyUrl;
            // videoRef.current.addEventListener('loadedmetadata', function () {
            //     videoRef.current?.play;
            //   })
            if (videoRef.current.paused) {
                videoRef.current.play();
            }
            return () => {
                dispatch(resetPlayer());
            };
        }

        const hls = new Hls()
        hls.loadSource(proxyUrl);
        hls.attachMedia(videoRef.current);

        if (videoRef.current.paused) {
            videoRef.current.play();
        }

        return () => {
            hls.destroy();
            dispatch(resetPlayer());
        };
    }, [watchlistLoading, addProgressToWatchlist, dispatch, hasShowProgress, show, matche]);

    const interact = useCallback(() => {
        setControlsActive(true);
        document.body.classList.remove("hide-cursor");

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        timeoutRef.current = setTimeout(() => {
            if (!playing) {
                return;
            }

            document.body.classList.add("hide-cursor");
            setControlsActive(false);
        }, 3000);
    }, [playing]);

    useEffect(() => {
        interact();
    }, [interact]);

    useEffect(() => {
        const beforeUnload = () => {
            if (!videoRef.current) {
                return;
            }

            addProgressToWatchlist(show, videoRef.current.currentTime);
        };

        document.addEventListener("mousemove", interact);
        window.addEventListener("beforeunload", beforeUnload);

        return () => {
            document.removeEventListener("mousemove", interact);
            window.removeEventListener("beforeunload", beforeUnload);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [addProgressToWatchlist, show, interact]);

    /** Plays video if pause, else pause video. */
    const togglePlay = useCallback(() => {
        if (!videoRef.current) {
            return;
        }

        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }, []);

    /** Opens container fullscreen if closed, else closes fullscreen. */
    const toggleFullscreen = useCallback(() => {
        if (!fullscreenContainer.current) {
            return;
        }

        handleFullscreen(fullscreenContainer.current).then(isFullscreen =>
            dispatch(setFullscreen(isFullscreen))
        );
    }, [dispatch, fullscreenContainer]);

    /** Sets play state according to video paused state. */
    const handlePlayState = useCallback(() => {
        if (!videoRef.current) {
            return;
        }

        dispatch(setPlaying(!videoRef.current.paused));
    }, [dispatch]);

    /**
     * Calculates progress from video's current time and duration.
     * @returns {number}
     */
    const calcProgress = useCallback((): number => {
        if (!videoRef.current) {
            return 0;
        }

        return videoRef.current.currentTime / videoRef.current.duration;
    }, []);

    /**
     * Calculates buffer from video's buffered length and duration.
     * @returns {number}
     */
    const calcBuffer = useCallback((): number => {
        if (!videoRef.current) {
            return 0;
        }

        const buffer = 0;

        return buffer / videoRef.current.duration;
    }, []);

    /**
     * Generates timestamp from absolute number and duration.
     * @param {number} abs
     * @returns {string}
     */
    const timeStampFromAbs = useCallback((abs: number): string => {
        if (!videoRef.current) {
            return DEFAULT_TIMESTAMP;
        }

        const time = videoRef.current.duration * abs;

        return convertToTimeCode(time);
    }, []);

    /**
     * Generates timestamp from current time.
     * @returns {string} Current time in time code.
     */
    const currentTimeStamp = useCallback((): string => {
        if (!videoRef.current) {
            return DEFAULT_TIMESTAMP;
        }

        return convertToTimeCode(videoRef.current.currentTime);
    }, []);

    /**
     * Generates timestamp from current time and duration.
     * @returns {string} Missing time in time code.
     */
    const missingTimeStamp = useCallback((): string => {
        if (!videoRef.current) {
            return DEFAULT_TIMESTAMP;
        }

        return convertToTimeCode(videoRef.current.duration - videoRef.current.currentTime);
    }, []);

    /**
     * Jump to specific time from absolute number and duration.
     * @param {number} abs
     */
    const jumpToAbs = useCallback((abs: number): void => {
        if (!videoRef.current) {
            return;
        }

        videoRef.current.currentTime = videoRef.current.duration * abs;
    }, []);

    /**
     * Event Listeners
     */
    const onPlay = useCallback(() => {
        handlePlayState();
    }, [handlePlayState]);

    const onPause = useCallback(() => {
        handlePlayState();
    }, [handlePlayState]);

    const onProgress = useCallback(() => {
        dispatch(setBuffer(calcBuffer()));
    }, [dispatch, calcBuffer]);

    const onTimeUpdate = useCallback(() => {
        dispatch(setProgress(calcProgress()));
        dispatch(setWaiting(false));
    }, [dispatch, calcProgress]);

    const onWaiting = useCallback(() => {
        dispatch(setWaiting(true));
    }, [dispatch]);

    const eventListeners = {
        onPlay,
        onPause,
        onProgress,
        onTimeUpdate,
        onWaiting,
    };

    return (
        <PlayerContext.Provider
            value={{
                videoRef,
                controlsActive,
                togglePlay,
                toggleFullscreen,
                currentTimeStamp,
                missingTimeStamp,
                timeStampFromAbs,
                jumpToAbs,
            }}>
            <Video ref={videoRef} {...eventListeners} />
            {children}
        </PlayerContext.Provider>
    );
};

export const withPlayer = <T,>(WrappedComponent: React.ComponentType<T & PlayerProps>) => {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

    const ComponentWithProvider = (props: T & PlayerProps) => {
        return (
            <PlayerProvider {...props}>
                <WrappedComponent {...props} />
            </PlayerProvider>
        );
    };

    ComponentWithProvider.displayName = `withPlayer(${displayName})`;

    return ComponentWithProvider;
};

export const usePlayer = () => useContext(PlayerContext);
