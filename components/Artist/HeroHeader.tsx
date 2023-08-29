import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Box, Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { FastAverageColor } from "fast-average-color";
import { extractColors } from "extract-colors";
import { motion } from "framer-motion";

const HeroHeader = ({ artist }) => {
  // console.log(artist)

  const router = useRouter();

  const fac = new FastAverageColor();

  const { data: dynamicColor } = useSWR(["/color", router], () =>
    fac.getColorAsync(artist?.images[0]?.url)
  );

  return (
    <>
      <HStack spacing={5}>
        <Stack
          w={550}
          h={320}
          position={"relative"}
          overflow={"hidden"}
          rounded={15}
          opacity={"65%"}
        >
          <Image
            layout={"fill"}
            objectFit={"cover"}
            objectPosition={"100% 30%"}
            src={artist?.images[0]?.url}
            placeholder={"blur"}
            blurDataURL={artist?.images[2]?.url}
          />
        </Stack>

        <Text
          noOfLines={1}
          bgGradient={
            dynamicColor
              ? `linear-gradient(to-r, ${dynamicColor?.rgba} ,  ${dynamicColor?.rgba} , #ffff )`
              : "linear-gradient(to-r, #ffff , #ffff )"
          }
          bgClip={"text"}
          fontSize={"8xl"}
          fontWeight={"bold"}
        >
          {artist.name}
        </Text>
      </HStack>
    </>
  );
};

export default HeroHeader;
