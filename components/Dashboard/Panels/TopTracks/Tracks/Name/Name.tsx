import React from 'react';
import {Stack, Text} from "@chakra-ui/react";
import {useRecoilValue} from "recoil";
import {PLAYBACK_INFORMATION} from "../../../../../../recoil/atoms/atoms";
import Link from "next/link";
import {TSongs} from "../../../../../TMainData";


const Name = ({value} : {value : Partial<TSongs["tracks"][0]>}) => {

    const playbackInformation = useRecoilValue(PLAYBACK_INFORMATION)

    //*Specify playback status, playing or paused
    //*Music ID selected by the user
    const check = playbackInformation.isPlaying && value?.id === playbackInformation.idsOfSongs

    return (
        <Stack flex={5} spacing={1}>
            <Text noOfLines={1} fontSize={["xs" , "xs" , "xs" , "xs" , "sm"]} fontWeight={"bold"}
                  color={check ? "#7886FF" : "white"}>{value?.name}</Text>
            <Link href={`/artist/${value?.artists?.[0]?.id}`}>
            <Text as={"u"} noOfLines={1} cursor={"pointer"} fontSize={"2xs"}>{value?.artists?.[0]?.name}</Text>
            </Link>
        </Stack>
    );
};

export default Name;
