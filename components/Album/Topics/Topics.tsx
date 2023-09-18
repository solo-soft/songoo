import {Box, Divider, Hide, HStack, Stack, Text} from "@chakra-ui/react";
import React from "react";

const Topics = () => {
    return (
        <Stack py={3}>
            <HStack>
                <Box flex={[0 , 0 , .1]}/>
                <Text flex={[0 , 0 , .1]} fontSize={"xs"}>#</Text>
                <Text flex={[1 , 1 ,  2]} fontSize={"xs"}>Name</Text>
                <Hide below={"lg"}>
                    <Text flex={1} fontSize={"xs"} >Artists</Text>
                </Hide>
                <Text flex={.5} fontSize={"xs"}>Duration</Text>
                <Box flex={.2}/>
            </HStack>
            <Divider />
        </Stack>
    );
};

export default Topics;
