import {Divider, HStack, Stack, Text} from "@chakra-ui/react";
import React from "react";

const Topics = () => {
    return (
        <Stack p={3}>
            <HStack w={"full"}  rounded={15}>
                <Text fontSize={"xs"}>#</Text>
                <Text flex={1.5} fontSize={"xs"}>Name</Text>
                <Text flex={1} fontSize={"xs"} >Artists</Text>
                <Text flex={1} fontSize={"xs"}>Duration</Text>
            </HStack>
            <Divider />
        </Stack>
    );
};

export default Topics;
