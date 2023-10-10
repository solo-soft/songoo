import {
  Box,
  Button,
  HStack,
  IconButton,
  Spinner,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  PLAYBACK_INFORMATION,
  PLAYBACK_LOADING,
} from "../../recoil/atoms/atoms";
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
import { BiDownload } from "react-icons/bi";

export const Playback = () => {
  const [isMoved, setIsMoved] = useState(false);

  const playbackRef = useRef(null);

  const [playbackInformation, setPlaybackInformation] =
    useRecoilState(PLAYBACK_INFORMATION);

  const playbackLoading = useRecoilValue(PLAYBACK_LOADING);

  const { indexOfSongs, arrayOfSongs, isPlaying, session } =
    playbackInformation;

  const { id, preview_url, name } = arrayOfSongs[indexOfSongs] ?? {};

  const { swrFetcher } = useFetchSwr();
  const { spotifyScraper } = useScraper();

  const { data: scraperInfos } = swrFetcher(
    ["SpotifyScraper", id],
    id && session.user ? async ([_, id]) => await spotifyScraper(id) : null,
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
        translateY: "63px",
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
        translateY: isMoved ? "-10px" : "63px",
      }}
    >
      <VStack position={"relative"} rounded={5} overflow={"hidden"} spacing={0}>
        <Box
          pointerEvents={!!arrayOfSongs.length ? "auto" : "none"}
          w={"full"}
          cursor={"pointer"}
          h={3}
          bg={!!arrayOfSongs.length ? "#7886FF" : "#414141"}
          onClick={handleClick}
        />
        {/*Playback parent*/}
        <HStack
          w={["xs", "sm", "lg"]}
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
                {(!scraperInfos && session.user) || playbackLoading ? (
                  <Spinner
                    thickness="3px"
                    emptyColor={"transparent"}
                    color={"#7886FF"}
                    size="sm"
                  />
                ) : (
                  <a
                    href={scraperInfos?.Downloadurl}
                    download={scraperInfos?.SongTitle}
                  >
                    <IconButton
                      size={"xs"}
                      variant={"outline"}
                      aria-label="Download"
                      icon={<BiDownload size={15} />}
                    />
                  </a>
                )}
              </HStack>
            </HStack>

            <Timer playbackRef={playbackRef} />
          </Stack>
        </HStack>
      </VStack>
      <Audio
        prev={preview_url}
        scraperUrlLink={scraperInfos?.Downloadurl}
        playbackRef={playbackRef}
      />
    </motion.div>
  );
};
