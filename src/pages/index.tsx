import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Opener } from "../layout/shared/Opener";
import { useWatchlist } from "@lib/watchlist/context";
import { Spinner } from "../layout/shared/Spinner";
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

const BoxContent = styled.div`
    display: block;
    font-family: Roboto, Arial;
    min-height: 100%;
    color: #eee;
    font-size: 14px;
    line-height: 1.4em;
    font-weight: 400;
    padding: 0;
    margin: 0;
    text-size-adjust: none;
    -webkit-text-size-adjust: none;

    width: 100% !important;
    margin-right: auto;
    margin-left: auto;

    @media (min-width: 1200px) {
        max-width: 1100px;
    }

    @media (min-width: 576px) {
            max-width: 540px;
    }

    @media (min-width: 768px) {
        max-width: 750px;
    }

    @media (min-width: 992px) {
        max-width: 980px;
    }
`; 





const WrapperList = styled.div`
    display: flex;
    justify-content: left;
    margin: 0 -10px;
    flex-wrap: wrap;
    font-family: Roboto, Arial;
    min-height: 100%;
    color: #eee;
    overflow-x: hidden;
    font-size: 14px;
    line-height: 1.4em;
    font-weight: 400;
    padding: 0;
    margin: 0;
    text-size-adjust: none;
    -webkit-text-size-adjust: none;
    text-align: left;
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

    const [matches, setMatches] = useState<MatchModule.Matchs[] | null>(null);
    const [inWatch, setInWatch] = useState(false);

    const fetchMatchData = async () => {
        try {
            const response = await fetch("https://api.vebo.xyz/api/match/featured");
            const data = await response.json() as Match;
            const response1 = await fetch("https://live.vebo.xyz/api/match/live");
            const data1 = await response1.json()as Match;

            const map1 = new Map(data1?.data.map((item) => [item.id, item]));
            const updatedData = data?.data.map((item) => (map1.has(item.id) ? map1.get(item.id)! : item));

            setMatches(updatedData);
            setInWatch(true);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchLiveData = async () => {
        try {
            const response = await fetch("https://live.vebo.xyz/api/match/live");
            const data = await response.json()as Match;
            const map1 = new Map(data?.data.map((item) => [item.id, item]));
            const updatedData = matches?.map((item) => (map1.has(item.id) ? map1.get(item.id)! : item));
            setMatches(updatedData as MatchModule.Matchs[]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

   
    useEffect(() => {
        fetchMatchData()
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log("asdasd");
            fetchLiveData();
          }, 30000); 
          return () => clearInterval(intervalId);
    }, [inWatch]);

    return (
        <React.Fragment>
            <Meta 
                title="Trang VINITRAN.COM livestream bóng đá trực tuyến"
                description="Xem VINITRAN.COM trực tiếp bóng đá nhanh nhất. Link Vinitran.com bóng đá nhanh miễn phí cùng kết quả, lịch thi đấu mới nhất"
            />
            {watchlistLoading ? (
                <PageLoading>
                    <Spinner />
                </PageLoading>
            ) : (
                <PageWrapper>
                    <Opener />
                    <BoxContent>
                        <WrapperList>
                            {matches?.map(item => (
                                // item.is_live &&
                                <MatchCard data={item} key={item.id} />
                            ))}
                        </WrapperList>
                    </BoxContent>
                </PageWrapper>
            )}
        </React.Fragment>
    );
};

export default Home;
