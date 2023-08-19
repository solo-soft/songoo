import {Stack} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const Images = ({picture}) => {
    return (
        <Stack position={"relative"} p={8} rounded={5} overflow={"hidden"}
               bg={"#252525"}>
            <Image src={picture} objectFit={"cover"} layout={"fill"}/>
        </Stack>
    );
};

export default Images;
