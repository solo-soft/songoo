import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import useMilliseconds from "../../../../../hooks/useMilliseconds";

const Songs = ({ tracks }) => {
  const { milliseconds } = useMilliseconds();

  return (
    <VStack flex={1}>
      <Text
        fontSize={{ base: 20, md: 30 }}
        fontWeight="bold"
        color="whiteAlpha.700"
      >
        Songs
      </Text>
      <VStack
        w="full"
        h={450}
        overflowY={{ base: "visible", md: "scroll" }}
        sx={{
          "&::-webkit-scrollbar": {
            width: "0",
            height: "0",
          },
          scrollbarWidth: "none",
          "-ms-overflow-style": "none",
        }}
      >
        {tracks?.items.map((song) => {
          return (
            <HStack
              key={song.id}
              w="full"
              bg={"#252525"}
              justify="space-between"
              align="center"
              p={2}
            >
              <HStack justify="center" align="center">
                <Box w={50} h={50} position="relative" overflow="hidden" rounded={5}>
                  <Image
                    style={{transition : ".5s"}}
                    layout="fill"
                    src={song.album.images[1].url || "/brokenImage.png"}
                    placeholder={"blur"}
                    blurDataURL={song.album.images[2].url || "/"}
                  />
                </Box>
                <Box>
                  <Text noOfLines={1} fontSize={"sm"}>
                    {song.name}
                  </Text>

                  <Text fontSize="xs" noOfLines={1}>
                    {song.artists[0].name}
                  </Text>
                </Box>
              </HStack>

              <Text fontSize="xs">{milliseconds(song.duration_ms)}</Text>
            </HStack>
          );
        })}
      </VStack>
    </VStack>
  );
};

export default Songs;
