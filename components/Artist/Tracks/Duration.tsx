import React from 'react';
import {Stack, Text} from "@chakra-ui/react";
import useMilliseconds from "../../../hooks/useMilliseconds";
import _ from "lodash";
import {useTheme} from "@chakra-ui/react";
import {TSongs} from "../TArist";

const Duration = ({track} : {track : Partial<TSongs["tracks"][0]>}) => {

    const theme = useTheme()
    const { primary  , secondary , contrast} = _.get(theme, "font.color.section.artist");
    const {milliseconds} = useMilliseconds()

    return (
        <Stack flex={1} align={"flex-end"}>
            <Text fontWeight={"bold"} fontSize={["xs" , "xs" , "sm"]} color={contrast}>
                {milliseconds(track.duration_ms)}
            </Text>
        </Stack>
    );
};

export default Duration;
