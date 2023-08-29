import React from "react";
import useSWR from "swr";
import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FastAverageColor } from "fast-average-color";
import Description from "../Description/Description";

const Title = () => {
  const { data, error } = useSWR("query/schema/getAlbumsInfoById", null);
  const router = useRouter();
  const fac = new FastAverageColor();

  const { data: dynamicColor } = useSWR(["/color", router], () =>
    fac.getColorAsync(data.albums.images[0].url)
  );

  return (
    <Stack>
      <Text
        noOfLines={1}
        fontSize={"6xl"}
        fontWeight={"bold"}
        bgGradient={dynamicColor ? `linear(to-l, #FFFF ,${dynamicColor?.rgba})` : "linear(to-l, #FFFF , #FFFF)" }
        bgClip={"text"}
      >
        {data.albums.name}
      </Text>

      <Text noOfLines={1} fontSize={"sm"} fontWeight={"bold"}>
          Contains {data.albums.total_tracks} songs from{" "}
        {data.albums.artists[0].name}
      </Text>
      <Description />
    </Stack>
  );
};

export default Title;
