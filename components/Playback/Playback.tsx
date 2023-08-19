import { Box, HStack, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import "react-h5-audio-player/lib/styles.css";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import prettyMilliseconds from "pretty-ms";
import {
  BsFillPlayFill,
  BsFillPauseFill,
  BsFillSkipStartFill,
  BsSkipEndFill,
} from "react-icons/bs";
import { Range, getTrackBackground } from "react-range";
import { PLAYBACK_INFORMATION_NEW } from "../../recoil/atoms/atoms";
import { produce } from "immer";

export const Playback = () => {
  const playbackRef = useRef<any>();
  const [playbackInformation, setPlaybackInformation] = useRecoilState(
    PLAYBACK_INFORMATION_NEW
  );

  const { indexOfSongs, arrayOfSongs } = playbackInformation;

  const {
    id,
    name,
    album: { id: albumId, name: albumName, images } = {},
    preview_url,
    duration_ms,
  } = arrayOfSongs[indexOfSongs] ?? {};

  useEffect(() => {
    if (playbackInformation.isPlaying) {
      const interval = setInterval(
        () =>
          setPlaybackInformation((prev) =>
            produce(prev, (draft) => {
              draft.elapsedTime += 1;
            })
          ),
        1000
      );
      return () => clearInterval(interval);
    }
  }, [playbackInformation.elapsedTime, playbackInformation.isPlaying]);


  useEffect(() => {
    setPlaybackInformation((prev) =>
      produce(prev, (draft) => {
        draft.audioRef = playbackRef.current;
      })
    );
  }, []);

  useEffect(() => {
    setPlaybackInformation((prev) =>
      produce(prev, (draft) => {
        draft.idsOfSongs = id;
      })
    );
  }, [id]);

  const handelNext = () => {
    setPlaybackInformation((prev) =>
      produce(prev, (draft) => {
        draft.elapsedTime = 0;
        draft.isPlaying = true;
        draft.indexOfSongs = (prev.indexOfSongs + 1) % arrayOfSongs.length;
      })
    );
  };
  const handelPrev = () => {
    setPlaybackInformation((prev) =>
      produce(prev, (draft) => {
        draft.elapsedTime = 0;
        draft.isPlaying = true;
        draft.indexOfSongs =
          prev.indexOfSongs === 0
            ? arrayOfSongs.length - 1 - prev.indexOfSongs
            : prev.indexOfSongs - 1;
      })
    );
  };

  const handlePlayPause = () => {
    setPlaybackInformation((prev) =>
      produce(prev, (draft) => {
        draft.isPlaying = !prev.isPlaying;
      })
    );

    if (!playbackInformation.isPlaying) {
      playbackRef.current.play();
    } else {
      playbackRef.current.pause();
    }
  };

  const handleTimeChange = (e) => {
    const time = e[0];
    setPlaybackInformation((prev) =>
      produce(prev, (draft) => {
        draft.elapsedTime = time;
      })
    );
    playbackRef.current.currentTime = time;
  };

  return (
    <HStack
      w={"lg"}
      h={65}
      bg={"#252525"}
      align={"center"}
      zIndex={2000}
      position={"fixed"}
      bottom={15}
      left={0}
      right={0}
      m={"auto"}
      rounded={5}
      overflow={"hidden"}
      spacing={0}
    >
      <Box w={3} h={"full"} bg={"#7886FF"} />

      <Box p={34} bg={"red"} position={"relative"}>
        <Image src={images?.[0]?.url} layout={"fill"} objectFit={"cover"} />
      </Box>

      <Stack w={"full"}>
        <HStack>
          <Stack flex={1} spacing={1} p={1}>
            <Text noOfLines={1} fontSize={"sm"}>
              {name}
            </Text>

            <HStack w={"full"} justifyContent={"space-between"}>
              <Text fontSize={"2xs"}>
                {prettyMilliseconds(
                  playbackRef?.current?.duration * 1000 || 60000,
                  {
                    colonNotation: true,
                    secondsDecimalDigits: 0,
                  }
                )}
              </Text>
              <Text fontSize={"2xs"}>
                {prettyMilliseconds(
                  (playbackRef?.current?.duration -
                    playbackInformation.elapsedTime) *
                    1000 || 0,
                  {
                    colonNotation: true,
                    secondsDecimalDigits: 0,
                  }
                )}
              </Text>
            </HStack>

            <audio
              onEnded={handelNext}
              src={preview_url}
              autoPlay={true}
              ref={playbackRef}
            />

            <Range
              min={0}
              max={playbackRef.current && playbackRef.current.duration}
              values={[playbackInformation.elapsedTime]}
              onChange={handleTimeChange}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "3px",
                    width: "100%",
                    background: getTrackBackground({
                      values: [playbackInformation.elapsedTime],
                      colors: ["#7885FF", "#292E5C"],
                      min: 0,
                      max: playbackRef.current && playbackRef.current.duration,
                    }),
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    display: "none",
                  }}
                />
              )}
            />
          </Stack>

          <HStack p={2}>
            <Icon
              onClick={handelPrev}
              color={"#D9D9D9"}
              fontSize={30}
              as={BsFillSkipStartFill}
            />

            <VStack onClick={handlePlayPause} rounded={50} bg={"#D9D9D9"}>
              {playbackInformation.isPlaying ? (
                <Icon color={"#252525"} fontSize={32} as={BsFillPauseFill} />
              ) : (
                <Icon color={"#252525"} fontSize={32} as={BsFillPlayFill} />
              )}
            </VStack>
            <Icon
              onClick={handelNext}
              color={"#D9D9D9"}
              fontSize={30}
              as={BsSkipEndFill}
            />
          </HStack>
        </HStack>
      </Stack>
    </HStack>
  );
};
