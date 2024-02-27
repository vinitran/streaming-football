import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { text } from "@css/typography";
import { content } from "@css/helper/content";
import { fullWidthClassName } from "react-remove-scroll-bar";

const NavigationWrapper = styled.div`
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    background: ${p => p.theme.backgroundGradient_180_50};
`;

const NavigationInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${content()};
    min-height: ${p => p.theme.navigationHeight};
`;

const LogoLink = styled(Link)`
    ${text("displaySm", "bold")};
`;

const LogoMark = styled.span`
    color: ${p => p.theme.primary};
`;

export const Navigation: React.FC = () => {
    return (
        <NavigationWrapper>
            <div className={fullWidthClassName}>
                <NavigationInner>
                    <LogoLink href="/" passHref>
                        Vinitran.com<LogoMark>.</LogoMark>
                    </LogoLink>
                </NavigationInner>
            </div>
        </NavigationWrapper>
    );
};
