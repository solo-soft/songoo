import React from 'react';
import {motion} from "framer-motion";
import {Icon, VStack} from "@chakra-ui/react";
import {BsFillPauseFill, BsFillPlayFill} from "react-icons/bs";
import {useRecoilState} from "recoil";
import {PLAYBACK_INFORMATION} from "../../recoil/atoms/atoms";
import {produce} from "immer";

const PlayPuse = ({playbackRef}) => {
    const [playbackInformation, setPlaybackInformation] =
        useRecoilState(PLAYBACK_INFORMATION);

    const { indexOfSongs, arrayOfSongs, isPlaying } = playbackInformation;

    const handlePlayPause = () => {
        setPlaybackInformation((prev) =>
            produce(prev, (draft) => {
                draft.isPlaying = !prev.isPlaying;
            })
        );

        if (!playbackInformation.isPlaying) {
            playbackRef.current?.play();
        } else {
            playbackRef.current?.pause();
        }
    };

    return (
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
    );
};

export default PlayPuse;
