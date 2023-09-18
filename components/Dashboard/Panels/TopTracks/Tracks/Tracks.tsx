import { HStack } from "@chakra-ui/react";
import Images from "./Images/Images";
import DotsMenu from "../../../../#General/DotsMenu/DotsMenu";
import Albums from "./Albums/Albums";
import Likes from "../../../../#General/Likes";
import Duration from "../../../../#General/Duration";
import Name from "./Name/Name";
import Controller from "../../../../#General/Controller";
import {TArtistInfo, TSongs} from "../../../../TMainData";

type TTopTracks = {
  songs: Partial<TSongs["tracks"][0]>;
  songIndex: number;
  singerInfo : TArtistInfo
}

const Tracks = ({ songs, songIndex, singerInfo }: TTopTracks) => {
  const listOfSongsInfo = singerInfo?.songs?.tracks;

  return (
    <HStack
      role={"group"}
      _hover={{ bg: "blackAlpha.300" }}
      rounded={10}
      key={songs?.id}
      justifyContent={"space-between"}
    >
      <Controller
        idsOfSongs={songs?.id}
        indexOfSongs={songIndex}
        arrayOfSongs={listOfSongsInfo}
        toRecently={true}
        flex={[1.2, 1.5, 0.8, 1.5]}
        iconSize={["lg", "2xl", "2xl", "lg"]}
      />
      <Images picture={songs?.album} />
      <Name value={songs} />
      <Albums album={songs?.album} />


      <HStack flex={[3, 3, 2, 3]} justify={"space-between"} align={"center"}>
        <Likes songs={songs} />
        <Duration songs={songs} />
        <DotsMenu songs={songs} />
      </HStack>


    </HStack>
  );
};

export default Tracks;
