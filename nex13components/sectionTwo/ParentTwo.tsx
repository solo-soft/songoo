"use client"

import {Box, useTheme} from "@chakra-ui/react";

const ParentTwo = () => {

    const {background : {section}} = useTheme()

    return (
        <Box width={"full"} height={"100vh"} bg={section.second}>
            Hello
        </Box>
    );
};

export default ParentTwo;