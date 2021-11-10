import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { Card } from "../molecule/Card";
import { aspectRatio, fillParent } from "@css/content";
import { HeadlineS } from "@css/typography";

const TeaserWrapper = styled.div`
    padding: 0 2rem;

    @media ${p => p.theme.bp.l} {
        padding: 0 4rem;
    }
`;

const TeaserHeadline = styled.h3`
    ${HeadlineS};
    margin-bottom: 1.5rem;
`;

const TeaserList = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: -0.5rem;
`;

const TeaserCard = styled.a`
    flex: 1 1 calc(50% - 1rem);
    max-width: calc(50% - 1rem);
    margin: 0.5rem;
    ${aspectRatio(1.5)};

    @media ${p => p.theme.bp.m} {
        flex: 1 1 calc(25% - 1rem);
        max-width: calc(25% - 1rem);
    }
`;

const TeaserCardInner = styled.div`
    ${fillParent};
`;

interface BlockTeaserProps {
    headline?: string;
    shows: Api.TV[];
}

export const BlockTeaser: React.FC<BlockTeaserProps> = ({ headline, shows }) => {
    return (
        <TeaserWrapper>
            {headline && <TeaserHeadline>{headline}</TeaserHeadline>}
            <TeaserList>
                {shows.slice(0, 8).map(show => (
                    <Link key={show.id} href={{ query: { id: show.id } }} shallow passHref>
                        <TeaserCard key={show.id}>
                            <TeaserCardInner>
                                <Card {...show} />
                            </TeaserCardInner>
                        </TeaserCard>
                    </Link>
                ))}
            </TeaserList>
        </TeaserWrapper>
    );
};