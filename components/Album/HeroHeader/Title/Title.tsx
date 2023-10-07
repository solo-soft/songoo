
import useSWR from "swr";
import {Box, HStack, Stack, Text, VStack} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FastAverageColor } from "fast-average-color";
import Description from "../Description/Description";
import {TSpecificAlbums} from "../../TAlbum";

const Title = ({albumInfo} : { albumInfo: TSpecificAlbums | undefined }) => {

  const router = useRouter();
  const fac = new FastAverageColor();

  const { data: dynamicColor } = useSWR(["/color", router], () =>
    fac.getColorAsync(albumInfo?.albums?.images?.[0]?.url || "/")
  );

  return (
    <VStack position={"absolute"} bottom={10} w={620}>

      <Text
        noOfLines={1}
        fontSize={["2xl" , "2xl" , "4xl"]}
        as={"b"}
        bgGradient={dynamicColor ? `linear(to-l, #FFFF ,${dynamicColor?.rgba})` : "linear(to-l, #FFFF , #FFFF)" }
        bgClip={"text"}
      >
        {albumInfo?.albums?.name}
      </Text>

      <Text noOfLines={1} fontSize={["2xs" , "2xs" , "sm"]} as={"b"}>
          Contains {albumInfo?.albums?.total_tracks} songs from{" "}
        {albumInfo?.albums?.artists?.[0].name}
      </Text>

      <Description albumInfo={albumInfo} />

    </VStack>
  );
};

export default Title;
