import React from 'react';
import {Text, VStack} from "@chakra-ui/react";

const Loading = () => {
    return (
        <VStack h={[550, 450]}>
            <Text fontSize={"sm"} >Searching...</Text>
        </VStack>
    );
};

export default Loading;
