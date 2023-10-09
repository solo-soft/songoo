import React, { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  PLAYBACK_ELAPSED_TIME,
  PLAYBACK_DURATION,
  PLAYBACK_INFORMATION,
  PLAYBACK_LOADING,
} from "../../recoil/atoms/atoms";
import { produce } from "immer";

const Audio = ({ playbackRef, prev, scraperUrlLink }) => {
  const toast = useToast();

  const [playbackInformation, setPlaybackInformation] =
    useRecoilState(PLAYBACK_INFORMATION);

  const { arrayOfSongs, session } = playbackInformation;

  const setElapsedTime = useSetRecoilState(PLAYBACK_ELAPSED_TIME);
  const setDuration = useSetRecoilState(PLAYBACK_DURATION);
  const setLoading = useSetRecoilState(PLAYBACK_LOADING);

  const elapsedTime = () => {
    return setInterval(
      () => setElapsedTime(playbackRef?.current?.currentTime),
      1000
    );
  };

  const handelNext = () => {
    setPlaybackInformation((prev) =>
      produce(prev, (draft) => {
        draft.isPlaying = true;
        draft.indexOfSongs = (prev.indexOfSongs + 1) % arrayOfSongs.length;
      })
    );
    playbackRef.current.pause();
    playbackRef.current.currentTime = 0;
    playbackRef.current.src = "";
    setElapsedTime(0);
    clearInterval(elapsedTime());
  };

  const onLoadedStart = () => {
    setLoading(true);
  };
  const onLoaded = () => {
    setLoading(false);
    setDuration(playbackRef?.current?.duration * 1000);
    elapsedTime();
  };

  useEffect(() => {
    if (prev === null && !session.user) {
      toast({
        title: "Preview unavailable. please join to enjoy the full music",
        status: "error",
        position: "top-left",
      });
    }

    if (prev && !session.user) {
      toast({
        title:
          "This is the preview of the song, please join to enjoy the full music",
        status: "warning",
        position: "top-left",
      });
    }
  }, [prev]);

  return (
      <>
        <audio
            onEnded={handelNext}
            onLoadedData={onLoaded}
            src={session.user ? scraperUrlLink : prev}
            autoPlay={true}
            ref={playbackRef}
            onLoadStart={onLoadedStart}
            preload={"auto"}
        />
      </>
  );
};

export default Audio;
