import {Box, HStack, Icon, Spinner, Stack, Text, VStack} from "@chakra-ui/react";
import "react-h5-audio-player/lib/styles.css";
import Image from "next/image";
import {useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import prettyMilliseconds from "pretty-ms";
import {
  BsFillPlayFill,
  BsFillPauseFill,
  BsFillSkipStartFill,
  BsSkipEndFill,
} from "react-icons/bs";
import { Range, getTrackBackground } from "react-range";
import { PLAYBACK_INFORMATION , PLAYBACK_LOADING } from "../../recoil/atoms/atoms";
import { produce } from "immer";
import { motion } from "framer-motion";
import { useScraper } from "../../hooks/useScraper";
import useFetchSwr from "../../hooks/useFetchSwr";
import Timer from "./Timer/Timer";
import Audio from "./Audio";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";
import PlayPuse from "./PlayPuse";
import Images from "./Images";
import Name from "./Name";
import Artists from "./Artists";

export const Playback = () => {
  const [isMoved, setIsMoved] = useState(false);

  const playbackRef = useRef<any>(null);

  const [playbackInformation, setPlaybackInformation] =
    useRecoilState(PLAYBACK_INFORMATION);

  const playbackLoading = useRecoilValue(PLAYBACK_LOADING)

  const { indexOfSongs, arrayOfSongs, isPlaying } = playbackInformation;

  const {
    id,
    name,
    album: { id: albumId, name: albumName, images } = {},
    artists,
    preview_url,
    duration_ms,
  } = arrayOfSongs[indexOfSongs] ?? {};

  const { swrFetcher } = useFetchSwr();
  const { spotifyScraper } = useScraper();

  const { data: scraperInfos } = swrFetcher(
    ["SpotifyScraper", id],
    id ? async ([_, id]) => await spotifyScraper(id) : null,
    {
      keepPreviousData: false,
      onFocus: false,
    }
  );

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

  const handleClick = () => {
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
        translateY:  isMoved ? "-10px" : "65px",
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
          <Images />

          <Stack flex={1} spacing={1} px={3}>
            <HStack w={"full"}>
              <Box flex={1}>
                <Name />
                <Artists />
              </Box>

              <HStack flex={2} justify={"center"}>
                <PrevButton playbackRef={playbackRef} />
                <PlayPuse playbackRef={playbackRef} />
                <NextButton playbackRef={playbackRef} />
              </HStack>

              <HStack flex={1} justify={"flex-end"}>
                {
                  !scraperInfos || playbackLoading ?
                      <Spinner
                          thickness='3px'
                          emptyColor={"transparent"}
                          color={"#7886FF"}
                          size='sm'
                      />
                      :
                      null

                }
              </HStack>
            </HStack>

            <Timer playbackRef={playbackRef} />
          </Stack>
        </HStack>
      </VStack>
      <Audio
        prev={preview_url}
        scraperInfos={scraperInfos}
        playbackRef={playbackRef}
      />
    </motion.div>
  );
};
