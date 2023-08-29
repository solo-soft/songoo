import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import Image from "next/image";

const Images = ({ songs, property }) => {


    const check = property === "playlist-songs"

  return (
    <Stack
      w={150}
      h={150}
      position={"relative"}
      rounded={15}
      overflow={"hidden"}
    >
      <Image
        src={check ? songs?.album?.images[0].url : songs?.song_info?.album?.images[0].url}
        layout={"fill"}
        objectFit={"cover"}
      />
    </Stack>
  );
};

export default Images;
