import {Icon} from "@chakra-ui/react";
import {BsFillSkipStartFill} from "react-icons/bs";
import {produce} from "immer";
import {useRecoilState, useSetRecoilState} from "recoil";
import {PLAYBACK_DURATION, PLAYBACK_ELAPSED_TIME, PLAYBACK_INFORMATION} from "../../recoil/atoms/atoms";

const PrevButton = ({playbackRef}) => {

    const [playbackInformation, setPlaybackInformation] =
        useRecoilState(PLAYBACK_INFORMATION);

    const { indexOfSongs, arrayOfSongs, isPlaying } = playbackInformation;
    const [elapsedTime, setElapsedTime] = useRecoilState(PLAYBACK_ELAPSED_TIME);

    const setDuration = useSetRecoilState(PLAYBACK_DURATION);
    const handelPrev = () => {
        playbackRef.current.pause()
        playbackRef.current.src = ""
        setDuration(0)
        setElapsedTime(0)
        setPlaybackInformation((prev) =>
            produce(prev, (draft) => {
                draft.isPlaying = true;
                draft.indexOfSongs =
                    prev.indexOfSongs === 0
                        ? arrayOfSongs.length - 1 - prev.indexOfSongs
                        : prev.indexOfSongs - 1;
            })
        );
    };


    return (
        <Icon
            onClick={handelPrev}
            color={"#D9D9D9"}
            fontSize={23}
            as={BsFillSkipStartFill}
        />
    );
};

export default PrevButton;
