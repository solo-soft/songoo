import { Grid, Stack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { TCollection } from "../../../TCollection";

const Plural = ({ collection }: { collection: TCollection }) => {
  return (
    <Grid templateColumns={`repeat(2 , 1fr)`} bg={"#252525"} >
      {collection?.song_info
        ?.slice(0, 4)
        .map((info: TCollection["song_info"]) => {
          return (
            <Stack
              w={"full"}
              h={[75 , 87 , 95 , 95]}
              bg={"#252525"}
              position={"relative"}
            >
              <Image
                layout={"fill"}
                objectFit={"cover"}
                placeholder={"blur"}
                blurDataURL={info?.album.images[2].url || "/"}
                src={info?.album.images[0].url || "/"}
              />
            </Stack>
          );
        })}
    </Grid>
  );
};

export default Plural;
