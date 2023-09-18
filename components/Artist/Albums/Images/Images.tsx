import React from 'react';
import {Box, Stack} from "@chakra-ui/react";
import Image from "next/image";
import Title from "./Title";

const Images = ({items}) => {
    return (
        <Box
            w={[150 , 150 ,  195]}
            h={[150 , 150 ,  195]}
            rounded={15}
            position={"relative"}
            overflow={"hidden"}
        >
            <Image
                layout={"fill"}
                objectFit={"cover"}
                src={items?.images[0].url}
                placeholder={"blur"}
                blurDataURL={items?.images[2].url}
            />

            <Title name={items.name} />
        </Box>
    );
};

export default Images;
