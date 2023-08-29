import { HStack } from "@chakra-ui/react";
import Images from "./Images";
import DotsMenu from "./DotsMenu";
import Albums from "./Albums";
import Likes from "./Likes";
import Directions from "./Directions";
import Name from "./Name";
import Controller from "./Controller";
import { useRecoilState } from "recoil";
import { PLAYBACK_INFORMATION_NEW } from "../../../../recoil/atoms/atoms";
import { useEffect } from "react";
import useRecently from "../../../../hooks/useRecently";

const Tracks = ({ singerSong, songIndex, singerInfo }) => {
  const [playbackInformation, setPlaybackInformation] = useRecoilState(
    PLAYBACK_INFORMATION_NEW
  );
  const listOfSongsInfo = singerInfo?.songs?.tracks;

  return (
    <HStack
      role={"group"}
      _hover={{ bg: "blackAlpha.300" }}
      rounded={10}
      key={singerSong.id}
      justifyContent={"space-between"}
    >
      <Controller
        idsOfSongs={singerSong.id}
        indexOfSongs={songIndex}
        arrayOfSongs={listOfSongsInfo}
        toRecently={true}
        flex={1.4}
      />

      <Images picture={singerSong.album.images[0].url} />

      <Name value={singerSong}/>

      <Albums name={singerSong.album.name} />

      <HStack flex={3} justify={"space-between"}>
        <Likes singerSong={singerSong} />

        <Directions duration={singerSong.duration_ms} />

        <DotsMenu songs={singerSong} />
      </HStack>
    </HStack>
  );
};

export default Tracks;
