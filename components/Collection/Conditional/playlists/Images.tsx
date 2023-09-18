import { Box, Grid, HStack, Stack, Text } from "@chakra-ui/react";
import _ from "lodash";
import Image from "next/image";
import React from "react";

const Images = ({ collection }) => {
  const check = collection?.song_info.length < 4;

  return (

      <Box position={"relative"} rounded={10} overflow={"hidden"}>
        {check ? (
          <Stack w={250} h={250} bg={"#252525"} rounded={"full"} overflow={"hidden"} position={"relative"}>
            <Image
              layout={"fill"}
              objectFit={"cover"}
              src={collection?.song_info[0]?.album.images[0].url}
            />
          </Stack>
        ) : (
          <Grid
            templateColumns={`repeat(2 , 1fr)`}
            bg={"#252525"}
          >
            {collection?.song_info?.slice(0, 4).map((info) => {
              return (
                  <Stack w={150} h={150} bg={"#252525"} position={"relative"}>
                <Image
                  layout={"fill"}
                  objectFit={"cover"}
                  src={info?.album.images[0].url}
                />
                  </Stack>
              );
            })}
          </Grid>
        )}

      </Box>

  );
};

export default Images;
