import React from 'react';
import {Box, Stack} from "@chakra-ui/react";
import Image from "next/image";

const Images = ({track}) => {
    return (
        <Stack
            p={[30 , 30 ,  35]}
            rounded={5}
            position={"relative"}
            overflow={"hidden"}
        >
            <Image
                style={{transition : ".5s"}}
                layout={"fill"}
                objectFit={"cover"}
                src={track.album?.images?.[0]?.url}
                placeholder={"blur"}
                blurDataURL={track.album?.images?.[2]?.url}
            />
        </Stack>
    );
};

export default Images;
