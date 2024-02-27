import Link from "next/link";
import React from "react";
import styled from "styled-components";

const MatchBlock = styled.div`
    background-color: #7a7d82;
    padding: 15px 10px;
    width: 370px;
    margin: 20px 20px;
    border-radius: 10px;
    align-items: center;
    justify-content: space-between;
    display: flex;
`;

const Logo = styled.div`
    width: auto;
    height: 100%;
`;

const LogoWrapper = styled.div`
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
    overflow: hidden;
`;

const WrapperTeam = styled.div`
    width: 160px;
    font-size: 17px;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

interface MatchCardProps {
    data: MatchModule.Matchs;
}

export const MatchCard: React.FC<MatchCardProps> = ({ data }) => {
    return (
        <Link href={data.id} as={`/watch/${data.id}`}>
            <MatchBlock>
                <WrapperTeam>
                    <LogoWrapper>
                        <Logo>
                            <img src={data.home.logo} />
                        </Logo>
                    </LogoWrapper>
                    <div>{data.home.name}</div>
                </WrapperTeam>
                <WrapperTeam>
                    <LogoWrapper>
                        <Logo>
                            <img src={data.away.logo} />
                        </Logo>
                    </LogoWrapper>
                    <div>{data.away.name}</div>
                </WrapperTeam>
            </MatchBlock>
        </Link>
    );
};
