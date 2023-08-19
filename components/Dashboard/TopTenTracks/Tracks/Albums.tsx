import {Stack, Text} from "@chakra-ui/react";
import React from "react";

const Albums = ({name}) => {
    return (
        <Stack flex={10} position={"relative"} p={7} rounded={8} overflow={"hidden"}>
            <Text noOfLines={1} fontSize={"xs"}
                  color={"white"}>{name}</Text>
        </Stack>
    );
};

export default Albums;
