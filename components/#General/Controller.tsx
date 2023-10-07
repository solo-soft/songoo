import { Box, Hide, Icon, VStack } from "@chakra-ui/react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { ScaleLoader } from "react-spinners";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  PLAYBACK_DURATION,
  PLAYBACK_ELAPSED_TIME,
  PLAYBACK_INFORMATION,
} from "../../recoil/atoms/atoms";
import { produce } from "immer";
import useRecently from "../../hooks/useRecently";

type TController = {
  idsOfSongs: string | undefined;
  indexOfSongs: number;
  arrayOfSongs: any[];
  toRecently: boolean;
  session: {};
  flex?: number | number[] | string | string[];
  iconSize?: number | number[] | string | string[];
  iconColor?: string;
  symbolSize?: number | Array<number> | [number, number] | any;
  symbolColor?: string;
};

const Controller = (props: TController) => {
  const [playbackInformation, setPlaybackInformation] =
    useRecoilState(PLAYBACK_INFORMATION);

  const setElapsedTime = useSetRecoilState(PLAYBACK_ELAPSED_TIME);

  const setDuration = useSetRecoilState(PLAYBACK_DURATION);

  const { addToRecentlyPlayed } = useRecently();

  const handelPlay = () => {
    playbackInformation.audioRef?.play();

    const quantity =
      playbackInformation.idsOfSongs === props.idsOfSongs
        ? playbackInformation.audioRef?.currentTime
        : 0;

    setDuration(quantity);
    setElapsedTime(quantity);

    setPlaybackInformation((prev) =>
      produce(prev, (draft) => {
        draft.session = props.session;
        draft.arrayOfSongs = props.arrayOfSongs;
        draft.indexOfSongs = props.indexOfSongs;
        draft.idsOfSongs = props.idsOfSongs;
        draft.isPlaying = true;
      })
    );
    if (props.toRecently) {
      addToRecentlyPlayed(props.arrayOfSongs[props.indexOfSongs]);
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
    playbackInformation.idsOfSongs === props.idsOfSongs;

  return (
    <VStack flex={props.flex}>
      {check ? (
        <>
          <Icon
            display={"none"}
            _groupHover={{ display: "block" }}
            fontSize={props.iconSize || "lg"}
            color={props.iconColor || "white"}
            onClick={handelPause}
            as={BsFillPauseFill}
          />
          <Hide below={"lg"}>
            <Box display={"block"} _groupHover={{ display: "none" }}>
              <ScaleLoader
                speedMultiplier={3}
                width={props.symbolSize?.[0] || 2}
                height={props.symbolSize?.[1] || 10}
                color={props.symbolColor || "#7886FF"}
              />
            </Box>
          </Hide>
          <Hide above={"lg"}>
            <Box display={"block"} _groupHover={{ display: "none" }}>
              <ScaleLoader
                speedMultiplier={3}
                width={2}
                height={10}
                color={props.symbolColor || "#7886FF"}
              />
            </Box>
          </Hide>
        </>
      ) : (
        <Icon
          fontSize={props.iconSize || "lg"}
          color={props.iconColor || "white"}
          onClick={handelPlay}
          as={BsFillPlayFill}
        />
      )}
    </VStack>
  );
};

export default Controller;
