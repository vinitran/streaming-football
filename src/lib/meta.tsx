import React from "react";
import Head from "next/head";

interface MetaProps {
    title: string;
    description:string;
}

// very basic implementation of meta information
export const Meta: React.FC<MetaProps> = ({ title, description }) => {
    return (
        <Head>
            <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8"/>
            <meta name="robots" content="index,follow"/>
            <meta httpEquiv="content-language" content="vi"/>
            <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1"/>
            
            <title>{title}</title>
            <meta name="description" content="Xem trực tiếp bóng đá nhanh nhất. Link bóng đá nhanh miễn phí cùng kết quả, lịch thi đấu mới nhất"/>
            <meta name="keywords" content="xem bong da,truc tiep bong da,bong da,xem bong online,link xem bong da,vinitran,vinitran.com,vini"/>
            
            <link rel="icon" href="https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png" sizes="any" />
            
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description}/>
        </Head>
    );
};
