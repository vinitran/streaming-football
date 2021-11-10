import React from "react";
import styled from "styled-components";
import { HeadlineL } from "@css/typography";
import { Profile } from "../atom/Profile";
import { Content } from "@css/content";

const ProfilesWrapper = styled(Content)``;

const ProfilesHeadline = styled.h1`
    ${HeadlineL};
    text-align: center;
`;

const ProfileList = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 4rem 2rem;
    margin-top: 6rem;
`;

const ProfileButton = styled.a``;

interface BlockProfileProps {
    profiles: Record<string, User.Profile>;
}

export const BlockProfile: React.FC<BlockProfileProps> = ({ profiles }) => {
    return (
        <ProfilesWrapper>
            <ProfilesHeadline>Who&apos;s watching?</ProfilesHeadline>
            <ProfileList>
                {Object.keys(profiles).map(uid => (
                    <ProfileButton key={uid} href={`/api/profile/switch?uid=${uid}`}>
                        <Profile {...profiles[uid]} />
                    </ProfileButton>
                ))}
            </ProfileList>
        </ProfilesWrapper>
    );
};