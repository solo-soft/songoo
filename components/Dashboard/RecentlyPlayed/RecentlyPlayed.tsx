import React, { useContext } from "react";
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Grid,
  HStack,
  Icon, Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import {RecentlyPlayedContext} from "../../../provider/RecentlyProvider";
import { useRecoilValue } from "recoil";
import _ from "lodash";
import { ScaleLoader } from "react-spinners";
import {
  IS_PLAYING,
  PLAYBACK_INFORMATION_NEW,
} from "../../../recoil/atoms/atoms";
import Controller from "../TopTenTracks/Tracks/Controller";

const RecentlyPlayed = () => {
  const playbackInformation = useRecoilValue(PLAYBACK_INFORMATION_NEW);

  const recentlyPlayed = useContext(RecentlyPlayedContext);

  const sortedData = _.sortBy(recentlyPlayed, (items) => -new Date(items.created_at));

  const listOfSongs = _.flatMap(sortedData, "recently_played");

  return (
    <Stack>
      <HStack justify={"space-between"}>
        <Text fontWeight={"light"} fontSize={25}>
          Recently Played
        </Text>
        <Button size={"xs"}>see more</Button>
      </HStack>
      <Divider />
      <Grid  gap={1} templateColumns={"repeat(3 , 1fr)"}>
        {sortedData?.slice(0, 6).map((value, index, array) => {
          const { id, song_info } = value;

          const check = playbackInformation.idsOfSongs === song_info.id;

          return (
            <HStack
              role={"group"}
              rounded={10}
              overflow={"hidden"}
              bg={"#252525"}
            >
              <Box p={8} bg={"#693672"} position={"relative"}>
                <Image
                  style={{
                    opacity:
                      check && playbackInformation.isPlaying ? "30%" : "100%",
                  }}
                  src={song_info.album?.images[0].url}
                  layout={"fill"}
                  objectFit={"cover"}
                />
                <AbsoluteCenter>
                  <Controller
                    toRecently={false}
                    idsOfSongs={song_info.id}
                    indexOfSongs={index}
                    arrayOfSongs={listOfSongs}
                    flex={1.4}
                  />
                </AbsoluteCenter>
              </Box>
              <Text noOfLines={1} fontWeight={"bold"} fontSize={"x-small"}>
                {song_info.name}
              </Text>
            </HStack>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default RecentlyPlayed;
