import React, { useContext } from "react";
import { Center, Divider, HStack, Text, useTheme } from "@chakra-ui/react";
import Name from "./Name";
import Images from "./Images";
import Playback from "./Playback";
import Menu from "./Menu";
import Duration from "../../../#General/Duration";
import Albums from "./Albums";
import { TCollection } from "../../TCollection";

export type TSongs = {
  songs: Partial<TCollection["song_info"]>;
  songsIndex: number;
};

const Songs = ({ songs, songsIndex }: TSongs) => {
  const props: TSongs = {
    songs,
    songsIndex,
  };
  return (
    <HStack bg={"#111111"} rounded={20} overflow={"hidden"}>
      <Images {...props} />
      <Center height="50px">
        <Divider borderWidth={2} rounded={50} orientation="vertical" />
      </Center>
      <Playback {...props} />
      <Name {...props} />
      <Duration {...props} />
      <Albums {...props} />
      <Menu {...props} />
    </HStack>
  );
};

export default Songs;
