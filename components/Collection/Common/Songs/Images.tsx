import React, { useContext } from "react";
import { Box, Stack } from "@chakra-ui/react";
import Image from "next/image";
import { TCollectionContext } from "../../TCollection";
import { CollectionContext } from "../../../../provider/CollectionProvider/CollectionProvider";
import { TSongs } from "./Songs";

const Images = ({ songs }: TSongs) => {
  return (
    <Stack
      w={[65, 65, 105]}
      h={[65, 65, 105]}
      position={"relative"}
      overflow={"hidden"}
      rounded={5}
      m={2}
      opacity={["100%", "100%", "60%"]}
    >
      <Image
        src={songs?.album?.images[0].url}
        layout={"fill"}
        objectFit={"contain"}
      />
    </Stack>
  );
};

export default Images;
