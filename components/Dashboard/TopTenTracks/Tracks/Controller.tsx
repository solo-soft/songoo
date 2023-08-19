import { Box, Icon, VStack } from "@chakra-ui/react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { ScaleLoader } from "react-spinners";
import { useRecoilState, useRecoilValue } from "recoil";
import { PLAYBACK_INFORMATION_NEW } from "../../../../recoil/atoms/atoms";
import { produce } from "immer";
import useRecently from "../../../../hooks/useRecently";

const Controller = ({ idsOfSongs, indexOfSongs, arrayOfSongs, toRecently , flex }) => {
  const [playbackInformation, setPlaybackInformation] = useRecoilState(
    PLAYBACK_INFORMATION_NEW
  );

    const { addToRecentlyPlayed } = useRecently();

  const handelPlay = () => {
    playbackInformation.audioRef?.play();
    setPlaybackInformation((prev) =>
      produce(prev, (draft) => {
        draft.arrayOfSongs = arrayOfSongs;
        draft.indexOfSongs = indexOfSongs;
        draft.idsOfSongs = idsOfSongs;
        draft.elapsedTime =
          prev.idsOfSongs === idsOfSongs ? prev.audioRef?.currentTime : 0;
        draft.isPlaying = true;
      })
    );
    if (toRecently) {
        addToRecentlyPlayed(arrayOfSongs[indexOfSongs]);
    }
  };
  const handelPause = () => {
    playbackInformation.audioRef?.pause();
    setPlaybackInformation((prev) =>
      produce(prev, (draft) => {
        draft.isPlaying = false;
      })
    );
  };

  const check =
    playbackInformation.isPlaying &&
    playbackInformation.idsOfSongs === idsOfSongs;

  return (
    <VStack flex={flex}>
      {check ? (
        <>
          <Icon
            display={"none"}
            _groupHover={{ display: "block" }}
            fontSize={"lg"}
            onClick={handelPause}
            as={BsFillPauseFill}
          />
          <Box display={"block"} _groupHover={{ display: "none" }}>
            <ScaleLoader
              speedMultiplier={3}
              width={2}
              height={10}
              color={"#7886FF"}
            />
          </Box>
        </>
      ) : (
        <Icon fontSize={"lg"} onClick={handelPlay} as={BsFillPlayFill} />
      )}
    </VStack>
  );
};

export default Controller;
