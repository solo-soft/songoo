import {AbsoluteCenter, Box, Divider, Show} from "@chakra-ui/react";
import Header from "../Header/Header";
import HeroHeader from "./HeroHeader/HeroHeader";
import Tracks from "./Tracks/Tracks";
import Topics from "./Topics/Topics";
import useFetchSwr from "../../hooks/useFetchSwr";
import getAlbumsInfoById from "../../graphQl/query/schema/getAlbumsInfoById";
import { useRouter } from "next/router";
import { ScaleLoader } from "react-spinners";
import { TSpecificAlbums } from "./TAlbum";
import React from "react";

const Album = () => {
  const router = useRouter();
  const { swrFetcher } = useFetchSwr();

  const { data: albumInfo }: { data: TSpecificAlbums | undefined } =
    swrFetcher<TSpecificAlbums>(
      ["query/schema/getAlbumsInfoById", router],
      ([_, router]) => getAlbumsInfoById(router.query.slug),
      {
        keepPreviousData: false,
      }
    );


  const props = {
    albumInfo,
  };

  return albumInfo ? (
    <Box h={"full"} overflow={"auto"}>
      <Header position={"relative"} />
      <HeroHeader {...props} />
      {/*<Topics />*/}
        <Divider my={5}/>
      <Tracks {...props} />
    </Box>
  ) : (
    <AbsoluteCenter>
      <Show above={"lg"}>
        <ScaleLoader width={25} height={80} color="#7886FF" />
      </Show>
      <Show below={"lg"}>
        <ScaleLoader width={5} height={25} color="#7886FF" />
      </Show>
    </AbsoluteCenter>
  );
};

export default Album;
