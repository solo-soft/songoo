import { Stack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { TCollection } from "../../../TCollection";

const Singular = ({ collection }: { collection: TCollection }) => {
  return (
    <Stack
      w={"full"}
      h={[150 , 175 , 190 , 190]}
      bg={"#252525"}
      rounded={"0"}
      overflow={"hidden"}
      position={"relative"}
    >
      <Image
        layout={"fill"}
        objectFit={"cover"}
        placeholder={"blur"}
        blurDataURL={collection?.song_info[0]?.album.images[2].url || "/"}
        src={collection?.song_info[0]?.album.images[0].url || "/"}
      />
    </Stack>
  );
};

export default Singular;
