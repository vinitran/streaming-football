import Link from "next/link";
import React from "react";
import styled from "styled-components";

const MatchBlock = styled.div`
    padding: 15px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 131px;
`;

const WrapperMatchBlock = styled.div`
    background: #3a3d44;
    overflow: hidden;
    position: relative;
    font-size: .95em;
    position: relative;
    display: block;
    width: calc(33.33% - 20px);
    margin: 0 10px 20px;
    border-radius: 0.75rem;
    box-shadow: 0 0 40px 40px rgba(255,255,255,.075) inset;

    @media (min-width: 1200px) {
        width: calc(33.33% - 20px) !important;
    }

    @media (max-width: 768px) {
        width: calc(100% - 20px) !important;
    }

    @media (max-width: 1079px) {
        width: calc(50% - 20px)
    }
`;

const Logo = styled.div`
    width: auto;
    height: 100%;
`;

const LogoWrapper = styled.div`
    display: inline-block;
    margin: 0 auto;
    position: relative;
    height: 60px;
    width: 60px;
`;

const WrapperTeam = styled.div`
    text-align: center;
    width: calc(50% - 10px - 40px);
    flex-shrink: 0;
`;

const TeamName = styled.div`
    display: flex;
    height: 36px;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    margin: 0;
`;

const WrapperTime = styled.div`
    width: 80px;
    margin: 0 10px 15px;
    text-align: center;
    flex-shrink: 0;
    display: block;
`;

const Score = styled.div`
    font-size: 1.8em;
    font-weight: 600;
`;

const Status = styled.div`
    font-size: 1.3em;
    font-weight: 500;
    margin-bottom: 7px;
    display: block;
    text-align: center;
`;

const Detail = styled.div`
    font-size: 1.2em;
    margin-bottom: 0;
`;

const WrapperLive = styled.div`
    width: 80px;
    margin: 0 10px 15px;
    text-align: center;
    flex-shrink: 0;
`;

const WrapperScore = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 7px;
    font-size: .95em;
`;

const Space = styled.div`
    padding: 0 10px;
    color: #8e8f92;
    font-size: 1.8em;
    font-weight: 600;
    display: block;

`;

const Time = styled.div`
    color: #25ff70; 
    font-size: 14px;
    font-weight: 500;
`;

const Live = styled.div`
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    font-size: 11px;
    line-height: 1em;
    font-weight: 500;
    padding: 6px 10px;
    border-radius: 20px;
    z-index: 4;
    background: #f2152d;
    color: #fff;
    text-transform: uppercase;
    box-shadow: 0 0 20px rgba(251,8,64,.5);
`;

const Tournament = styled.div`
    display: block;
    text-align: center;
`; 

const League = styled.div`
    background-color: rgba(255, 255, 255, .1);
    border-radius: 0 0 8px 8px;
    display: inline-block;
    line-height: 24px;
    padding: 0 12px;
    font-size: 11px;
    text-transform: uppercase;
`;

interface MatchCardProps {
    data: MatchModule.Matchs;
}

export const MatchCard: React.FC<MatchCardProps> = ({ data }) => {
    const time = new Date(data.timestamp);
    return (
        data.is_live? 
        <WrapperMatchBlock>
            <Link href={data.id} as={`/watch/${data.id}`}>
                <Live>Live</Live>
                <Tournament>
                    <League>
                        {data.tournament.name}
                    </League>
                </Tournament>
                <MatchBlock>
                    <WrapperTeam>
                        <LogoWrapper>
                            <Logo>
                                <img src={data.home.logo} />
                            </Logo>
                        </LogoWrapper>
                        <TeamName>{data.home.name}</TeamName>
                    </WrapperTeam>
                    <WrapperLive>
                        <WrapperScore>
                            <Score>
                                {data.scores.home}
                            </Score>
                            <Space>-</Space>
                            <Score>
                                {data.scores.away}
                            </Score>
                        </WrapperScore>
                        <Time>
                            {data.parse_data?.time}
                        </Time>
                    </WrapperLive>
                    <WrapperTeam>
                        <LogoWrapper>
                            <Logo>
                                <img src={data.away.logo} />
                            </Logo>
                        </LogoWrapper>
                        <TeamName>{data.away.name}</TeamName>
                    </WrapperTeam>
                </MatchBlock>
            </Link>
        </WrapperMatchBlock>
        :
        <WrapperMatchBlock>
            <Tournament>
                <League>
                    {data.tournament.name}
                </League>
            </Tournament>
            <MatchBlock>
                <WrapperTeam>
                    <LogoWrapper>
                        <Logo>
                            <img src={data.home.logo} />
                        </Logo>
                    </LogoWrapper>
                    <TeamName>{data.home.name}</TeamName>
                </WrapperTeam>
                <WrapperTime>
                    <Status>
                        {`${data.date.substring(6,8)}/${data.date.substring(4,6)}/${data.date.substring(0,4)}`}
                    </Status>
                    <Detail>
                        {`${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`}
                    </Detail>
                </WrapperTime>
                <WrapperTeam>
                    <LogoWrapper>
                        <Logo>
                            <img src={data.away.logo} />
                        </Logo>
                    </LogoWrapper>
                    <TeamName>{data.away.name}</TeamName>
                </WrapperTeam>
            </MatchBlock>
        </WrapperMatchBlock>        
    );
};
