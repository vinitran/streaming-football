import React, { useMemo } from "react";
import styled from "styled-components";
import { text } from "@css/typography";
import { Content } from "@css/helper/content";
import { Image } from "@lib/image";

const OpenerWrapper = styled.div`
    position: relative;
    isolation: isolate;
    display: flex;
    align-items: center;
    min-height: 65rem;
    padding: 10rem 0;

    ${p => p.theme.breakpoints.min("l")} {
        min-height: 75rem;
    }
`;

const OpenerBackground = styled.div`
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const OpenerGenres = styled.div`
    color: ${p => p.theme.gray800};
`;

const OpenerText = styled.div`
    max-width: 60rem;
    margin-top: 1rem;
`;

const AccentOverlay = styled.div`
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, ${p => p.theme.gray50} 0%, transparent 100%);
`;

const OpenerControls = styled.div`
    display: flex;
    gap: 1.5rem;
    margin-top: 2rem;
`;

const OpenerContent = styled(Content)``;

const OpenerTitle = styled.h1`
    ${text("displayLg", "black")};

    ${p => p.theme.breakpoints.min("m")} {
        ${text("display2Xl", "black")};
    }
`;

export const Opener = () => {
    return (
        <OpenerWrapper>
            <OpenerContent>
                <OpenerText>
                    Chào mừng bạn đến với Vinitran.com - Nơi xem bóng đá miễn phí dành cho bạn bè,
                    không có mục đích thương mai! Website mang đến cho bạn những trận đấu hấp dẫn từ
                    khắp nơi trên thế giới. Thưởng thức ngay và cùng chia sẻ đam mê bóng đá ngay hôm
                    nay!
                </OpenerText>
            </OpenerContent>
            <OpenerBackground>
                <Image
                    alt="poster"
                    src="https://res.cloudinary.com/de5wwikci/image/upload/v1708802621/wallpaperflare.com_wallpaper_sxusl3.jpg"
                    priority
                    fill
                />
            </OpenerBackground>
            <AccentOverlay />
        </OpenerWrapper>
    );
};
