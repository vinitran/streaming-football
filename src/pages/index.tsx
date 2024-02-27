import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { GetStaticProps } from "next";
import { Opener } from "../layout/shared/Opener";
import { AppState, REDUX_INITIAL_STATE, useAppSelector } from "@lib/redux";
import { TrendingSlider } from "../layout/shared/TrendingSlider/TrendingSlider";
import { fetchGenrePage, INFINITE_SCROLL_SKIP } from "@lib/redux/reducer/genre";
import { BasicSlider } from "../layout/shared/BasicSlider/BasicSlider";
import { useWatchlist } from "@lib/watchlist/context";
import { Spinner } from "../layout/shared/Spinner";
import { useDispatch } from "react-redux";
import { Meta } from "@lib/meta";
import { MatchCard } from "src/layout/shared/Home/Card";

const PageWrapper = styled.div`
    padding-bottom: 12rem;
`;

const PageLoading = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const WrapperList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0px -10px 1rem;
`;
interface HomeProps {
    featured: Api.TVDetails;
    trending: Api.TV[];
    genres: Api.Genre[];
}

interface Match {
    status: number;
    data: MatchModule.Matchs[];
}

const Home: React.FC<HomeProps> = () => {
    const { loading: watchlistLoading } = useWatchlist();

    const [matches, setMatches] = useState<Match | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.vebo.xyz/api/match/featured");
                const data = await response.json();
                setMatches(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <React.Fragment>
            <Meta title="Home" />
            {watchlistLoading ? (
                <PageLoading>
                    <Spinner />
                </PageLoading>
            ) : (
                <PageWrapper>
                    <Opener />
                    <WrapperList>
                        {matches?.data.map(item => (
                            // item.is_live &&
                            <MatchCard data={item} />
                        ))}
                    </WrapperList>
                </PageWrapper>
            )}
        </React.Fragment>
    );
};

export default Home;
