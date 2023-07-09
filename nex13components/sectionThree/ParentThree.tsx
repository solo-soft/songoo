"use client"

import {Box, useTheme} from "@chakra-ui/react";

const ParentThree = () => {

    const {background : {section}} = useTheme()

    return (
        <Box width={"full"} height={"100vh"} bg={section.third}>
            Hello
        </Box>
    );
};

export default ParentThree;