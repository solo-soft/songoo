import {
  Box,
  Divider,
  Grid,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import _ from "lodash";
import Controller from "../TopTenTracks/Tracks/Controller";
import Name from "../TopTenTracks/Tracks/Name";
import { useContext } from "react";
import { PinnedContext } from "../../../provider/PinnedProvider";

const Pinned = () => {
  const pinnedSongs = useContext(PinnedContext);

  const sortData = _.sortBy(pinnedSongs , (items) => -new Date(items.created_at))

  const listOfSongs = _.flatMap(sortData, "song_info");

  // console.log(pinnedSongs)

  return (
    <>
      <Text fontWeight={"light"} fontSize={25}>
        Pinned
      </Text>
      <Divider />
      <VStack w={"full"} overflow={"auto"}>
        {sortData.map((info, currentIndexId) => {
          return (
            <HStack
              _hover={{ bg: "blackAlpha.300" }}
              role={"group"}
              w={"full"}
              py={1}
              rounded={10}
              key={info.id}
            >
              <Controller
                idsOfSongs={info?.song_info.id}
                indexOfSongs={currentIndexId}
                arrayOfSongs={listOfSongs}
                flex={1.4}
              />

              <HStack flex={12}>
                <Box
                  w={45}
                  h={45}
                  position={"relative"}
                  rounded={5}
                  overflow={"hidden"}
                >
                  <Image
                    src={info?.song_info?.album?.images?.[1].url}
                    layout={"fill"}
                    objectFit={"cover"}
                  />
                </Box>
                <Name value={info.song_info} />
              </HStack>
            </HStack>
          );
        })}
      </VStack>
    </>
  );
};

export default Pinned;
