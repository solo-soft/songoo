import React from 'react';
import {Box, HStack, Stack, Text} from "@chakra-ui/react";
import useSWR from "swr";

const Description = () => {

    const {data , error} = useSWR("query/schema/getAlbumsInfoById" , null)

    return (
        <Box>
            <Text fontSize={"2xs"} opacity={"30%"} >
                Copyrights {data.albums.copyrights[0].text}
            </Text>
            <Text fontSize={"2xs"} opacity={"30%"} >
                Release at {data.albums.release_date}
            </Text>
        </Box>
    );
};

export default Description;
