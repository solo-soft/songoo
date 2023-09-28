import { Box, Hide, Icon, VStack } from "@chakra-ui/react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { ScaleLoader } from "react-spinners";
import {useRecoilState, useSetRecoilState} from "recoil";
import {PLAYBACK_DURATION, PLAYBACK_ELAPSED_TIME, PLAYBACK_INFORMATION} from "../../recoil/atoms/atoms";
import { produce } from "immer";
import useRecently from "../../hooks/useRecently";

type TController = {
  idsOfSongs: string | undefined;
  indexOfSongs: number;
  arrayOfSongs: any[];
  toRecently: boolean;
  flex?: number | number[] | string | string[];
  iconSize?: number | number[] | string | string[];
  iconColor?: string;
  symbolSize?: number | Array<number> | undefined;
  symbolColor?: string;
};

const Controller = ({
  idsOfSongs,
  indexOfSongs,
  arrayOfSongs,
  toRecently,
  flex,
  iconSize = undefined,
  iconColor = undefined,
  symbolSize = undefined,
  symbolColor = undefined,
}: TController) => {


  const [playbackInformation, setPlaybackInformation] =
    useRecoilState(PLAYBACK_INFORMATION);

  const [elapsedTime, setElapsedTime] = useRecoilState(PLAYBACK_ELAPSED_TIME);
  const setDuration = useSetRecoilState(PLAYBACK_DURATION);

  const { addToRecentlyPlayed } = useRecently();

  const handelPlay = () => {

    playbackInformation.idsOfSongs !== idsOfSongs &&  playbackInformation.audioRef?.pause();


    playbackInformation.audioRef?.play();

    // setElapsedTime(prev => playbackInformation.idsOfSongs === idsOfSongs ? playbackInformation.audioRef?.currentTime : 0)

    const quantity = playbackInformation.idsOfSongs === idsOfSongs ? playbackInformation.audioRef?.currentTime : 0

    setDuration(quantity)
    setElapsedTime( quantity)

    setPlaybackInformation((prev) =>
      produce(prev, (draft) => {
        draft.arrayOfSongs = arrayOfSongs;
        draft.indexOfSongs = indexOfSongs;
        draft.idsOfSongs = idsOfSongs;
        // draft.elapsedTime = prev.idsOfSongs === idsOfSongs ? prev.audioRef?.currentTime : 0;
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
            fontSize={iconSize || "lg"}
            color={iconColor || "white"}
            onClick={handelPause}
            as={BsFillPauseFill}
          />
          <Hide below={"lg"}>
            <Box display={"block"} _groupHover={{ display: "none" }}>
              <ScaleLoader
                speedMultiplier={3}
                width={symbolSize?.[0] || 2}
                height={symbolSize?.[1] || 10}
                color={symbolColor || "#7886FF"}
              />
            </Box>
          </Hide>
          <Hide above={"lg"}>
            <Box display={"block"} _groupHover={{ display: "none" }}>
              <ScaleLoader
                speedMultiplier={3}
                width={2}
                height={10}
                color={symbolColor || "#7886FF"}
              />
            </Box>
          </Hide>
        </>
      ) : (
        <Icon
          fontSize={iconSize || "lg"}
          color={iconColor || "white"}
          onClick={handelPlay}
          as={BsFillPlayFill}
        />
      )}
    </VStack>
  );
};

export default Controller;
