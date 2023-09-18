import React from "react";
import {Box, Hide, HStack, Stack, Text} from "@chakra-ui/react";
import useMilliseconds from "../../../../hooks/useMilliseconds";
import Controller from "../../../#General/Controller";
import useSWR from "swr";
import {useRouter} from "next/router";
import {FastAverageColor} from "fast-average-color";
import _ from "lodash"
import DotsMenu from "../../../#General/DotsMenu/DotsMenu";
import Likes from "../../../#General/Likes";
import Name from "../../../#General/Name/Name";


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


    return (
    <HStack role={"group"}>
      <Controller
          flex={.1}
          toRecently={true}
          iconSize={["sm" , "sm"  , "lg"]}
          arrayOfSongs={controllerData}
          indexOfSongs={trackIndex}
          idsOfSongs={track.id}
          symbolColor={dynamicColor?.rgba}

      />
      <Text flex={.1} >{track.track_number}</Text>
      <Name flex={[1 , 1 ,  2]} value={track} showArtistsName={false}/>

      <Hide below={"lg"}>
        <HStack flex={1}>
          {track.artists.map((info) => (
              <Text as={"u"} onClick={() => router.push(`/artist/${info.id}`)} cursor={"pointer"} noOfLines={1} fontSize={"xs"}>{info.name}</Text>
          ))}
        </HStack>
      </Hide>


      <Text flex={0.5} fontSize={"xs"}>
        {milliseconds(track.duration_ms)}
      </Text>

      <HStack flex={.2} spacing={5}>
        <Likes songs={track} />
        <DotsMenu songs={track}/>
      </HStack>


    </HStack>
  );
};

export default Items;
