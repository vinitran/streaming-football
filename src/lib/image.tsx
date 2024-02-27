import React, { CSSProperties } from "react";
import styled, { css } from "styled-components";
import { default as NextImage, ImageProps as NextImageProps } from "next/image";

const fillImage = css`
    object-fit: cover;
`;

const StyledImage = styled(NextImage)<{ $hasFill: boolean }>`
    ${p => p.$hasFill && fillImage};
`;

interface ImageProps
    extends Omit<
        NextImageProps,
        "alt" | "loader" | "unoptimized" | "objectPosition" | "objectFit"
    > {
    alt: string | undefined;
    objectFit?: CSSProperties["objectFit"];
    objectPosition?: CSSProperties["objectPosition"];
}

export const Image: React.FC<ImageProps> = ({
    alt,
    style,
    objectFit,
    objectPosition,
    ...props
}) => {
    return (
        <StyledImage
            alt={alt ?? ""}
            style={{ ...style, objectFit, objectPosition }}
            $hasFill={!!props.fill}
            unoptimized
            {...props}
        />
    );
};
