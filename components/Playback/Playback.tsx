import { Box, HStack, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import "react-h5-audio-player/lib/styles.css";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import prettyMilliseconds from "pretty-ms";
import {
  BsFillPlayFill,
  BsFillPauseFill,
  BsFillSkipStartFill,
  BsSkipEndFill,
} from "react-icons/bs";
import { Range, getTrackBackground } from "react-range";
import { PLAYBACK_INFORMATION } from "../../recoil/atoms/atoms";
import { produce } from "immer";
import { motion } from "framer-motion";

export const Playback = () => {
  const [isMoved, setIsMoved] = useState(false);

  const playbackRef = useRef<any>();
  const [playbackInformation, setPlaybackInformation] = useRecoilState(
    PLAYBACK_INFORMATION
  );

  const { indexOfSongs, arrayOfSongs, isPlaying } = playbackInformation;

  const {
    id,
    name,
    album: { id: albumId, name: albumName, images } = {},
    artists,
    preview_url,
    duration_ms,
  } = arrayOfSongs[indexOfSongs] ?? {};

  useEffect(() => {
    if (isPlaying) {
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
  }, [playbackInformation.elapsedTime, isPlaying]);

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

  const handleClick = async () => {
    setIsMoved(!isMoved);
  };

  useEffect(() => {
    if (!!arrayOfSongs.length) {
      setIsMoved(true);
    }
  }, [arrayOfSongs.length]);

  return (
    <motion.div
      initial={{
        translateY: "0px",
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        zIndex: 9998,
      }}
      animate={{
        bottom: 0,
        translateY: isMoved ? "-10px" : "65px",
      }}
    >
      <VStack position={"relative"} rounded={5} overflow={"hidden"} spacing={0}>
        <Box
          pointerEvents={!!arrayOfSongs.length ? "auto" : "none"}
          w={"full"}
          cursor={"pointer"}
          h={2}
          bg={!!arrayOfSongs.length ? "#7886FF" : "#414141"}
          onClick={handleClick}
        />

        <HStack
          w={["xs", "xs", "lg"]}
          h={65}
          bg={"#252525"}
          align={"center"}
          spacing={0}
          p={2}
        >
          <Box p={25} rounded={5} overflow={"hidden"} position={"relative"}>
            <Image src={images?.[0]?.url} layout={"fill"} objectFit={"cover"} />
          </Box>

          <Stack w={"full"}>
            <HStack>
              <Stack flex={1} spacing={1} px={3}>
                <HStack w={"full"}>
                  <Box flex={1}>
                    <Text
                      flex={1}
                      fontWeight={"bold"}
                      noOfLines={1}
                      fontSize={"sm"}
                    >
                      {name}
                    </Text>
                    <Text noOfLines={1} fontSize={"2xs"}>
                      {artists?.map((value) => value.name)}
                    </Text>
                  </Box>

                  <HStack flex={2} justify={"center"} p={0}>
                    <Icon
                      onClick={handelPrev}
                      color={"#D9D9D9"}
                      fontSize={23}
                      as={BsFillSkipStartFill}
                    />

                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <VStack onClick={handlePlayPause}>
                        {playbackInformation.isPlaying ? (
                          <Icon
                            color={"#D9D9D9"}
                            fontSize={23}
                            as={BsFillPauseFill}
                          />
                        ) : (
                          <Icon
                            color={"#D9D9D9"}
                            fontSize={23}
                            as={BsFillPlayFill}
                          />
                        )}
                      </VStack>
                    </motion.div>
                    <Icon
                      onClick={handelNext}
                      color={"#D9D9D9"}
                      fontSize={23}
                      as={BsSkipEndFill}
                    />
                  </HStack>

                  <HStack flex={1} justify={"flex-end"}></HStack>
                </HStack>

                <HStack w={"full"} justifyContent={"space-between"}></HStack>

                <audio
                  onEnded={handelNext}
                  src={preview_url}
                  autoPlay={true}
                  ref={playbackRef}
                />

                <HStack>
                  <Text fontSize={"2xs"} fontWeight={"bold"}>
                    {prettyMilliseconds(
                      playbackRef?.current?.duration * 1000 || 60000,
                      {
                        colonNotation: true,
                        secondsDecimalDigits: 0,
                      }
                    )}
                  </Text>
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
                            max:
                              playbackRef.current &&
                              playbackRef.current.duration,
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
                  <Text fontSize={"2xs"} fontWeight={"bold"}>
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
              </Stack>
            </HStack>
          </Stack>
        </HStack>
      </VStack>
    </motion.div>
  );
};
