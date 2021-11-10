import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { BlockCode } from "../../../app/layout/molecule/BlockCode";
import { fillParent } from "@css/content";
import { useRouter } from "next/router";
import { validateProfileCode } from "@lib/api/profile";
import { GetStaticProps } from "next";
import { profiles } from "@lib/mock/profile";
import { HeadlineS } from "@css/typography";
import { Close, CloseButton } from "../index";

const CodeWrapper = styled.div`
    ${fillParent};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CodeHelpWrapper = styled.div`
    min-height: 2.5rem;
    margin-top: 4rem;
`;

const CodeHelp = styled.div`
    ${HeadlineS};
    color: ${p => p.theme.gray400};
`;

const Code: React.FC = () => {
    const router = useRouter();
    const { uid } = router.query;
    const [code, setCode] = useState<string>("");
    const [error, setError] = useState<Common.Error | null>(null);

    useEffect(() => {
        if (code.length === 4) {
            submitCode();
        }
    }, [code, uid]);

    const submitCode = async () => {
        if (!uid || typeof uid !== "string") {
            return;
        }

        const res = await validateProfileCode(uid, code);

        if (!res) {
            return router.replace("/profile");
        }

        switch (res.status) {
            case 400:
                return setError(res);
            case 500:
                return router.replace("/profile");
            default:
                return (location.href = "/");
        }
    };

    return (
        <CodeWrapper>
            <Link href="/" passHref>
                <CloseButton>
                    <Close />
                </CloseButton>
            </Link>
            <BlockCode error={error} onChange={setCode} />
            <CodeHelpWrapper>
                {uid && typeof uid === "string" && profiles[uid] && (
                    <CodeHelp>Psst, it&apos;s {profiles[uid].password}.</CodeHelp>
                )}
            </CodeHelpWrapper>
        </CodeWrapper>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            hideNavigation: true,
        },
    };
};

export default Code;