import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import Image from "next/image";

const Images = ({ songs, property }) => {


  return (
    <Stack
      w={[65 , 65 ,150]}
      h={[65 , 65 ,150]}
      position={"relative"}
      rounded={15}
      overflow={"hidden"}
      flex={[.5 , .5 , .2]}
      opacity={["100%" , "100%" , "70%"]}
    >
      <Image
        src={songs?.album?.images[0].url}
        layout={"fill"}
        objectFit={"cover"}
      />
    </Stack>
  );
};

export default Images;
