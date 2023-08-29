import React from "react";
import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import useMilliseconds from "../../../../hooks/useMilliseconds";
import Controller from "../../../Dashboard/TopTenTracks/Tracks/Controller";
import useSWR from "swr";
import {useRouter} from "next/router";
import {FastAverageColor} from "fast-average-color";
import _ from "lodash"

const Items = ({ track, trackIndex }) => {
  const { milliseconds } = useMilliseconds();

  const { data : mainData, error } = useSWR("query/schema/getAlbumsInfoById", null);

    const router = useRouter();
    const fac = new FastAverageColor();

    const { data: dynamicColor } = useSWR(["/color", router], () =>
        fac.getColorAsync(mainData.albums.images[0].url)
    );

    //?Push image in this array
    const controllerData = mainData.albums.tracks.items.map(value => ({...value , album : { images : mainData.albums.images}}))

  console.log(controllerData)

    return (
    <HStack w={"full"} bg={"#252525"} h={75} px={5} rounded={15} role={"group"}>
      <Text noOfLines={1}>{track.track_number}</Text>
      <Text flex={1.5} noOfLines={1} fontSize={"sm"} fontWeight={"bold"}>
        {track.name}
      </Text>
      <HStack flex={1}>
        {track.artists.map((info) => (
          <Text fontSize={"xs"}>{info.name}</Text>
        ))}
      </HStack>
      <Text flex={0.5} fontSize={"xs"}>
        {milliseconds(track.duration_ms)}
      </Text>

      <Controller
        flex={0.5}
        toRecently={true}
        iconSize={25}
        arrayOfSongs={controllerData}
        indexOfSongs={trackIndex}
        idsOfSongs={track.id}
        symbolColor={dynamicColor?.rgba}
      />
    </HStack>
  );
};

export default Items;
