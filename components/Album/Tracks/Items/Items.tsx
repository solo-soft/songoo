import React from "react";
import { Box, Hide, HStack, Stack, Text } from "@chakra-ui/react";
import useMilliseconds from "../../../../hooks/useMilliseconds";
import Controller from "../../../#General/Controller";
import useSWR from "swr";
import { useRouter } from "next/router";
import { FastAverageColor } from "fast-average-color";
import _ from "lodash";
import DotsMenu from "../../../#General/DotsMenu/DotsMenu";
import Likes from "../../../#General/Likes";
import Name from "../../../#General/Name/Name";
import { TSpecificAlbums } from "../../TAlbum";

type TItems = {
  track: Partial<TSpecificAlbums["albums"]["tracks"]["items"][0]> | any;
  trackIndex: number;
  albumInfo: TSpecificAlbums | undefined;
};

const Items = ({ track, trackIndex, albumInfo }: TItems) => {
  const { milliseconds } = useMilliseconds();

  const { data: session } = useSWR("/api/getUserSession");
  const router = useRouter();
  const fac = new FastAverageColor();

  const { data: dynamicColor } = useSWR(["/color", router], () =>
    fac.getColorAsync(albumInfo?.albums.images[0].url || "/")
  );

  //?Push image in this array
  const controllerData = albumInfo?.albums.tracks.items.map((value) => ({
    ...value,
    album: { images: albumInfo.albums.images },
  }));

  return (
    <HStack role={"group"} py={2}>
      <Text flex={0.1}>{track.track_number}</Text>
      <Name flex={[1, 1, 2]} value={track} showArtistsName={false} />
      <Controller
        session={session}
        flex={[0.3, 0.2, 0.2, 0.1]}
        toRecently={true}
        iconSize={["sm", "sm", "lg"]}
        arrayOfSongs={controllerData || []}
        indexOfSongs={trackIndex}
        idsOfSongs={track.id}
      />

      <Hide below={"lg"}>
        <HStack flex={1}>
          {track?.artists?.map((info: any) => (
            <Text
              as={"u"}
              onClick={() => router.push(`/artist/${info.id}`)}
              cursor={"pointer"}
              noOfLines={1}
              fontSize={"xs"}
            >
              {info.name}
            </Text>
          ))}
        </HStack>
      </Hide>

      <Text flex={0.5} fontSize={"xs"}>
        {milliseconds(track.duration_ms)}
      </Text>

      <HStack flex={0.2} spacing={5}>
        <Likes songs={track} />
        <DotsMenu songs={track} />
      </HStack>
    </HStack>
  );
};

export default Items;
