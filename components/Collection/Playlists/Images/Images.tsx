import { Box } from "@chakra-ui/react";
import React from "react";
import { TCollection } from "../../TCollection";
import Singular from "./Singular/Singular";
import Plural from "./Plural/Plural";

const Images = ({ collection }: { collection: TCollection }) => {
  const check = collection?.song_info.length < 4;
  return (
    <Box position={"relative"} opacity={"40%"} overflow={"hidden"}>
      {check ? (
        <Singular collection={collection} />
      ) : (
        <Plural collection={collection} />
      )}
    </Box>
  );
};

export default Images;
