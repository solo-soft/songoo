import React from 'react';
import Image from "next/image";
import {Box, VStack} from "@chakra-ui/react";
import {ARTISTS_ID} from "../recoil/atoms/atoms";
import {useSetRecoilState} from "recoil";

type related = {
    __typename : "suggestion"
    artists : [{
        id : string,
        images : [{
            url : string
        }] | any
        name : string
        uri : string
    }]
}

const Related = ({related} : {related : related} ) => {

    const setArtistId = useSetRecoilState(ARTISTS_ID)

    const handelClick = (value : string) => {
        setArtistId(value)
    }


    const render = related?.artists.slice(0 , 6).map(value => {
            return (
                <Box key={value.id} w={62} h={62} position={"relative"} rounded={15} overflow={"hidden"}>
                    <Image layout={"fill"} objectFit={"cover"} src={value?.images?.[2].url} alt={value.name} onClick={() => handelClick(value.id)}/>
                </Box>
            )
    })

    return (
                <VStack>
                    {render}
                    <Box w={50} h={50} rounded={50} bg={"#252525"}/>
                </VStack>
    );
};

export default Related;
