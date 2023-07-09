"use client"

import {Box, useTheme} from "@chakra-ui/react";

const ParentFouer = () => {

    const {background : {section}} = useTheme()

    return (
        <Box width={"full"} height={"100vh"} bg={section.fourth}>
            Hello
        </Box>
    );
};

export default ParentFouer;