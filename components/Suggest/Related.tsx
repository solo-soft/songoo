import React from 'react';
import Image from "next/image";
import {Box, Skeleton, Stack, VStack} from "@chakra-ui/react";
import {ARTISTS_ID} from "../../recoil/atoms/atoms";
import {useSetRecoilState} from "recoil";

type related = {
    __typename: "suggestion"
    artists: [{
        id: string,
        images: [{
            url: string
        }] | any
        name: string
        uri: string
    }]
}

const Related = ({related}: { related: related }) => {

    const setArtistId = useSetRecoilState(ARTISTS_ID)

    const handelClick = (value: string) => {
        setArtistId(value)
    }



    const render = related?.artists?.slice(0, 6).map(value => {
        return (
            <Box key={value?.id} w={55} h={55} position={"relative"} rounded={10} overflow={"hidden"}>
                <Image layout={"fill"} sizes={"(max-width: 450px)"} objectFit={"cover"} src={value.images?.[2]?.url}
                       alt={value?.name} onClick={() => handelClick(value?.id)}/>
            </Box>
        )
    })

    return (
        <Stack>
            {render}
            <Box w={50} h={50} rounded={50} bg={"#252525"}/>
        </Stack>
    );
};

export default Related;
