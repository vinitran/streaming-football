import Link from "next/link";
import React from "react";
import styled from "styled-components";

const MatchBlock = styled.div`
    background-color: #7a7d82;
    padding: 15px 10px;
    width: 430px;
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

const WrapperTime = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0px 0px;
`;

const WrapperScore = styled.div`
    display: flex;
    min-width:50px;
    font-size: 20px;
    justify-content: space-between;
    align-items: center;
    margin: 0px 0px;
`;

interface MatchCardProps {
    data: MatchModule.Matchs;
}

export const MatchCard: React.FC<MatchCardProps> = ({ data }) => {
    const time = new Date(data.timestamp);
    return (
        data.is_live? 
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
                <WrapperScore>
                    <div>
                        {data.scores.home}
                    </div>
                    :
                    <div>
                        {data.scores.away}
                    </div>
                </WrapperScore>
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
        :
        <MatchBlock>
            <WrapperTeam>
                <LogoWrapper>
                    <Logo>
                        <img src={data.home.logo} />
                    </Logo>
                </LogoWrapper>
                <div>{data.home.name}</div>
            </WrapperTeam>
            <WrapperTime>
                <div>
                    {`${data.date.substring(6,8)}/${data.date.substring(4,6)}/${data.date.substring(0,4)}`}
                </div>
                <div>
                    {`${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`}
                </div>
            </WrapperTime>
            <WrapperTeam>
                <LogoWrapper>
                    <Logo>
                        <img src={data.away.logo} />
                    </Logo>
                </LogoWrapper>
                <div>{data.away.name}</div>
            </WrapperTeam>
        </MatchBlock>
    );
};
