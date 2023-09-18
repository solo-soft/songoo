import React from 'react';
import {Stack, Text} from "@chakra-ui/react";
import {useRecoilValue} from "recoil";
import {IS_PLAYING, PLAYBACK_INFORMATION} from "../../../recoil/atoms/atoms";

const Name = ({value , flex , showArtistsName = true}) => {

    console.log(value)

    const playbackInformation = useRecoilValue(PLAYBACK_INFORMATION)

    //*Specify playback status, playing or paused
    //*Music ID selected by the user
    const check = playbackInformation.isPlaying && value.id === playbackInformation.idsOfSongs

    return (
        <Stack flex={flex} spacing={1}>
            <Text noOfLines={1} fontSize={["xs" , "xs" , "sm"]} fontWeight={"bold"}
                  color={check ? "#7886FF" : "white"}>{value.name}</Text>
            {
                showArtistsName ? <Text noOfLines={1} fontSize={"2xs"}>{value.artists?.[0]?.name}</Text> : null
            }
        </Stack>
    );
};

export default Name;
