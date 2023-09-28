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
      <Stack
        direction={["column", "column", "row"]}
        w={"full"}
        justify={"center"}
        align={"center"}
        h={320}
        spacing={[2, 2, 5]}
      >
        <Stack
          w={[210, 210, 280]}
          h={[210, 210, 280]}
          position={"relative"}
          overflow={"hidden"}
          rounded={[25, 25, "full"]}
          opacity={"65%"}
        >
          <Image
            style={{ transition: ".5s" }}
            layout={"fill"}
            objectFit={"cover"}
            src={artist?.images[0]?.url}
            placeholder={"blur"}
            blurDataURL={artist?.images[2]?.url}
            priority
          />
        </Stack>

        <Stack>
          <Text
            noOfLines={1}
            bgGradient={
              dynamicColor
                ? `linear-gradient(to-r, ${dynamicColor?.rgba} ,  ${dynamicColor?.rgba} , #ffff )`
                : "linear-gradient(to-r, #ffff , #ffff )"
            }
            bgClip={"text"}
            fontSize={["3xl", "3xl", "8xl"]}
            fontWeight={"bold"}
          >
            {artist?.name}
          </Text>
          <Button>Subscribe</Button>
        </Stack>
      </Stack>
    </>
  );
};

export default HeroHeader;
