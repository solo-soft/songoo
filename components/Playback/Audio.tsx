import React from "react";
import { toast } from "react-toastify";
import {useRecoilState, useSetRecoilState} from "recoil";
import {
  PLAYBACK_ELAPSED_TIME,
  PLAYBACK_DURATION,
  PLAYBACK_INFORMATION,
  PLAYBACK_LOADING
} from "../../recoil/atoms/atoms";
import { produce } from "immer";

const Audio = ({ playbackRef, prev, scraperInfos }) => {


  const [playbackInformation, setPlaybackInformation] =
    useRecoilState(PLAYBACK_INFORMATION);

  const { indexOfSongs, arrayOfSongs, isPlaying } = playbackInformation;

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
    setLoading(true)
  }
  const onLoaded = () => {
    setLoading(false)
    setDuration(playbackRef?.current?.duration * 1000);
    elapsedTime();
  };

  return (
    <audio
      onEnded={handelNext}
      onLoadedData={onLoaded}
      src={scraperInfos?.Downloadurl}
      autoPlay={true}
      ref={playbackRef}
      onLoadStart={onLoadedStart}
      preload={scraperInfos?.Downloadurl}
    />
  );
};

export default Audio;
