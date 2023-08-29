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
      h={350}
      rounded={15}
      overflow={"hidden"}
      justifyContent={"space-between"}
      position={"relative"}
    >

      <HStack spacing={5} >
        <Images />
        <Title />
      </HStack>
    </HStack>
  );
};

export default HeroHeader;
