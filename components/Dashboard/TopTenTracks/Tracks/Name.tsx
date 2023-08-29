import React from 'react';
import {Stack, Text} from "@chakra-ui/react";
import {useRecoilValue} from "recoil";
import {CURRENT_SELECTED_SONG_ID, IS_PLAYING, PLAYBACK_INFORMATION_NEW} from "../../../../recoil/atoms/atoms";

const Name = ({value}) => {


    const playbackInformation = useRecoilValue(PLAYBACK_INFORMATION_NEW)

    //*Specify playback status, playing or paused
    //*Music ID selected by the user
    const check = playbackInformation.isPlaying && value.id === playbackInformation.idsOfSongs

    return (
        <Stack flex={5} spacing={1}>
            <Text noOfLines={1} fontSize={"sm"} fontWeight={"bold"}
                  color={check ? "#7886FF" : "white"}>{value.name}</Text>
            <Text noOfLines={1} fontSize={"2xs"}>{value.artists?.[0]?.name}</Text>
        </Stack>
    );
};

export default Name;
