import { AbsoluteCenter, Box } from "@chakra-ui/react";
import Image from "next/image";
import Controller from "../../../../#General/Controller";
import { useRecoilValue } from "recoil";
import { PLAYBACK_INFORMATION } from "../../../../../recoil/atoms/atoms";
import {TRecentlyPlayed} from "../TRecentlyPlayed";

type TImage = {
  song_info: Partial<TRecentlyPlayed["song_info"]>;
  songsIndex: number;
  listOfSongs: TRecentlyPlayed["song_info"][];
};

const Images = ({ song_info, songsIndex, listOfSongs } : TImage) => {

  const playbackInformation = useRecoilValue(PLAYBACK_INFORMATION);

  const check = playbackInformation.idsOfSongs === song_info.id;

  return (
    <Box
      w={["full", "full", "full", 50, 50, 55]}
      h={[85, 120, 165, 50, 50, 55]}
      bg={"#693672"}
      position={"relative"}
    >
      <Image
        style={{
          opacity: check && playbackInformation.isPlaying ? "30%" : "100%",
        }}
        src={song_info.album?.images[0].url || "/"}
        layout={"fill"}
        objectFit={"cover"}
      />
      <AbsoluteCenter>
        <Controller
          toRecently={false}
          idsOfSongs={song_info.id}
          indexOfSongs={songsIndex}
          arrayOfSongs={listOfSongs}
          flex={1.4}
        />
      </AbsoluteCenter>
    </Box>
  );
};

export default Images;
