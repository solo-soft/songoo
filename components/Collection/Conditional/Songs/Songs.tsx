import React from "react";
import { HStack } from "@chakra-ui/react";
import Name from "./Name";
import Images from "./Images";
import Playback from "./Playback";
import Menu from "./Menu";
import Duration from "../../../#General/Duration";
import Likes from "../../../#General/Likes";
const Songs = ({
  songs,
  songsIndex,
  property,
  interactionsCollections,
  // playlistSongs,
}) => {
  const props = {
    songs,
    songsIndex,
    property,
    interactionsCollections,
    // playlistSongs,
  };
  return (
    <HStack>
      <Name {...props} />
      <Images {...props} />
      <Playback {...props} />
      <Duration {...props} />
      <Menu {...props} />
    </HStack>
  );
};

export default Songs;