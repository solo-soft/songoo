import React from "react";
import {Box, Button, Grid, HStack, Stack, Text} from "@chakra-ui/react";
import Image from "next/image";
import useSWR from "swr";
import getUserDataOnSupabase from "../../../supabase/reads/getUserDataOnSupabase";
import { TUserPlaylists } from "../Type";
import _ from "lodash"

const Playlists = () => {
  const { data: session } = useSWR("/api/getUserSession");

  const { data: userPlaylists }: { data: Array<TUserPlaylists> | undefined } =
    useSWR(
      "/supabase/reads/UserPlaylists",
      () => getUserDataOnSupabase("UserPlaylists", session),
      {
        keepPreviousData: true,
      }
    );

  return (
    <>
        <HStack justify={"space-between"}>
            <Text fontWeight={"light"} fontSize={25}>
                Your Playlists
            </Text>
            <Button size={"xs"}>see more</Button>
        </HStack>
      <Grid gap={2} templateColumns={`repeat(3 , 1fr)`}>
        {_.sortBy(userPlaylists , "created_at")?.slice(0 ,3).map((playlist) => {
          const check = playlist.song_info.length < 4;
          return (
            <Box position={"relative"} rounded={10} overflow={"hidden"}>
              {check ? (
                <Stack bg={"#252525"}>
                  <Image
                    width={150}
                    height={150}
                    objectFit={"cover"}
                    src={playlist?.song_info[0]?.album.images[0].url}
                  />
                </Stack>
              ) : (
                <Grid
                  templateColumns={`repeat(${check ? 2 : 2} , 1fr)`}
                  bg={"#252525"}
                >
                  {playlist?.song_info?.slice(0, 4).map((info) => {
                    return (
                      <Image
                        width={80}
                        height={80}
                        objectFit={"cover"}
                        src={info?.album.images[0].url}
                      />
                    );
                  })}
                </Grid>
              )}

              <HStack
                w={"full"}
                p={1}
                justifyContent={"space-between"}
                bg={"blackAlpha.800"}
                position={"absolute"}
                bottom={0}
              >
                <Text
                  fontWeight={"bold"}
                  fontSize={"xs"}
                  noOfLines={1}
                  textAlign={"center"}
                  w={"full"}
                >
                  {playlist.title}
                </Text>
              </HStack>
            </Box>
          );
        })}
      </Grid>
    </>
  );
};

export default Playlists;
