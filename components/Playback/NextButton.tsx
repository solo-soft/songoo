import {produce} from "immer";
import {Icon} from "@chakra-ui/react";
import {BsSkipEndFill} from "react-icons/bs";
import {useRecoilState, useSetRecoilState} from "recoil";
import {PLAYBACK_DURATION, PLAYBACK_ELAPSED_TIME, PLAYBACK_INFORMATION} from "../../recoil/atoms/atoms";

const NextButton = ({playbackRef}) => {

    const [playbackInformation, setPlaybackInformation] =
        useRecoilState(PLAYBACK_INFORMATION);

    const { indexOfSongs, arrayOfSongs, isPlaying } = playbackInformation;
    const [elapsedTime, setElapsedTime] = useRecoilState(PLAYBACK_ELAPSED_TIME);
    const setDuration = useSetRecoilState(PLAYBACK_DURATION);

    const handelNext = () => {
        playbackRef.current.pause()
        playbackRef.current.src = ""
        setDuration(0)
        setElapsedTime(0)
        setPlaybackInformation((prev) =>
            produce(prev, (draft) => {
                draft.isPlaying = true;
                draft.indexOfSongs = (prev.indexOfSongs + 1) % arrayOfSongs.length;
            })
        );
    };


    return (
        <Icon
            onClick={handelNext}
            color={"#D9D9D9"}
            fontSize={23}
            as={BsSkipEndFill}
        />
    );
};

export default NextButton;
