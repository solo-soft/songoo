import React from "react";
import useSWR from "swr";
import {Box, HStack, Stack, VStack} from "@chakra-ui/react";
import Title from "./Title/Title";
import Images from "./Images/Images";
import { TSpecificAlbums } from "../TAlbum";

const HeroHeader = ({ albumInfo }: { albumInfo: TSpecificAlbums | undefined }) => {
  const props = {
    albumInfo,
  };

  return (
    <HStack
      w={"full"}
      h={["auto", "auto", "auto"]}
      py={5}
      rounded={15}
      justifyContent={"space-between"}
    >
      <VStack
        w={"full"}
        spacing={[2, 2, 5]}
        position={"relative"}
        overflow={"hidden"}
      >
        <Images {...props} />
        <Title {...props} />
      </VStack>
    </HStack>
  );
};

export default HeroHeader;
