import React from "react";
import useSWR from "swr";
import { Box, HStack, Stack } from "@chakra-ui/react";
import Title from "./Title/Title";
import Images from "./Images/Images";

const HeroHeader = () => {
  const { data, error } = useSWR("query/schema/getAlbumsInfoById", null);

  return (
    <HStack
      w={"full"}
      h={["auto" , "auto" , "auto"]}
      py={5}
      rounded={15}
      overflow={"hidden"}
      justifyContent={"space-between"}
      position={"relative"}
    >

      <Stack w={"full"} direction={["column" , "column" , "row"]} align={"center"} spacing={[ 2, 2 , 2]} >
        <Images />
        <Title />
      </Stack>
    </HStack>
  );
};

export default HeroHeader;
