import {
    Box,
    HStack,
    Icon,
    RangeSlider,
    RangeSliderFilledTrack, RangeSliderThumb,
    RangeSliderTrack,
    Stack,
    Text,
    VStack,
    Input
} from "@chakra-ui/react";
import "react-h5-audio-player/lib/styles.css";
import Image from "next/image";
import {useEffect, useMemo, useRef, useState} from "react";
import {useRecoilState, useSetRecoilState} from "recoil";
import {CONTROL_PLAYBACK, PLAYBACK_REF, TIME_LEFT} from "../../recoil/atoms/atoms";
import prettyMilliseconds from "pretty-ms";
import {IS_PLAYING, CURRENT_SELECTED_MUSIC_ID} from "../../recoil/atoms/atoms";
import {BsFillPlayFill, BsFillPauseFill, BsFillSkipStartFill, BsSkipEndFill} from "react-icons/bs"
import {Range, getTrackBackground} from "react-range";


export const Playback = () => {


    const playbackRef = useRef<any>()

    const [playbackList, setPlaybackList] = useRecoilState(CONTROL_PLAYBACK)

    const {index, list} = playbackList


    const [isPlaying, setIsPlaying] = useRecoilState(IS_PLAYING)

    const [timeLeft, setTimeLeft] = useRecoilState<number>(TIME_LEFT)

    const setPlaybackRef = useSetRecoilState(PLAYBACK_REF)

    const setSelectCurrentMusicId = useSetRecoilState(CURRENT_SELECTED_MUSIC_ID)


    const {
        id,
        name,
        album: {
            id: albumId,
            name: albumName,
            images
        } = {},
        preview_url,
        duration_ms
    } = list[index] ?? {}


    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => setTimeLeft(prevState => prevState + 1), 1000)
            return () => clearInterval(interval)
        }
    }, [timeLeft, isPlaying])


    useEffect(() => {
        setPlaybackRef(playbackRef.current)
    }, [])

    useEffect(() => {
        setSelectCurrentMusicId(id)
    }, [id])


    //*9 is length of list array !!
    const handelNext = () => {
        setTimeLeft(0)
        setIsPlaying(true)
        setPlaybackList((prevState) => (
            {
                ...prevState,
                index: (prevState.index + 1) % list.length,
            }
        ))
    }
    const handelPrev = () => {
        setTimeLeft(0)
        setIsPlaying(true)
        setPlaybackList((prevState) => (
            {
                ...prevState,
                index: (prevState.index === 0 ? (list.length - 1) - prevState.index : prevState.index - 1),
            }
        ))
    }

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            playbackRef.current.play();
        } else {
            playbackRef.current.pause();
        }
    };

    const handleTimeChange = (e) => {

        console.log(e)

        const time = e[0];
        console.log(time)
        setTimeLeft(time)
        playbackRef.current.currentTime = time;

        // const time = e.target.value;
        // setTimeLeft(parseInt(time))
        // playbackRef.current.currentTime = time;
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

            <Box w={3} h={"full"} bg={"#7886FF"}/>

            <Box p={34} bg={"red"} position={"relative"}>
                <Image src={images?.[0]?.url} layout={"fill"} objectFit={"cover"}/>
            </Box>


            <Stack w={"full"}>

                <HStack>

                    <Stack flex={1} spacing={1} p={1}>
                        <Text noOfLines={1} fontSize={"sm"}>{name}</Text>


                        <HStack w={"full"} justifyContent={"space-between"}>
                            <Text
                                fontSize={"2xs"}>{prettyMilliseconds(playbackRef?.current?.duration * 1000 || 60000, {
                                colonNotation: true,
                                secondsDecimalDigits: 0
                            })}</Text>
                            <Text
                                fontSize={"2xs"}>{prettyMilliseconds(((playbackRef?.current?.duration - timeLeft) * 1000) || 0, {
                                colonNotation: true,
                                secondsDecimalDigits: 0
                            })}</Text>
                        </HStack>

                        <audio onEnded={handelNext} src={preview_url} autoPlay={true} ref={playbackRef}/>

                        {/*<RangeSlider*/}
                        {/*             onChange={handleTimeChange}*/}
                        {/*             aria-label={['min', 'max']}*/}
                        {/*             colorScheme={"purple"}*/}
                        {/*             // defaultValue={[0 , 5]}*/}
                        {/*             size={"sm"}*/}
                        {/*             max={playbackRef.current && playbackRef.current.duration}*/}
                        {/*             value={[0 , timeLeft]}>*/}

                        {/*    <RangeSliderTrack>*/}
                        {/*        <RangeSliderFilledTrack/>*/}
                        {/*    </RangeSliderTrack>*/}


                        {/*</RangeSlider>*/}

                        {/*<input*/}
                        {/*    type="range"*/}
                        {/*    min="0"*/}
                        {/*    max={playbackRef.current && playbackRef.current.duration}*/}
                        {/*    value={timeLeft}*/}
                        {/*    onChange={handleTimeChange}*/}
                        {/*    style={{*/}
                        {/*        background : "red",*/}
                        {/*        outline : "none",*/}
                        {/*        border : "none!important"*/}
                        {/*    }}*/}
                        {/*/>*/}

                        <Range
                            min={0}
                            max={playbackRef.current && playbackRef.current.duration}
                            values={[timeLeft]}
                            onChange={handleTimeChange}
                            renderTrack={({props, children}) => (
                                <div
                                    {...props}
                                    style={{
                                        ...props.style,
                                        height: '3px',
                                        width: '100%',
                                        background: getTrackBackground({
                                            values: [timeLeft],
                                            colors: ["#7885FF", "#292E5C"],
                                            min: 0,
                                            max: playbackRef.current && playbackRef.current.duration
                                        }),

                                    }}
                                >
                                    {children}
                                </div>
                            )}
                            renderThumb={({props}) => (
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

                        <Icon onClick={handelPrev} color={"#D9D9D9"} fontSize={30} as={BsFillSkipStartFill}/>

                        <VStack onClick={handlePlayPause} rounded={50} bg={"#D9D9D9"}>
                            {
                                isPlaying ?
                                    <Icon color={"#252525"} fontSize={32} as={BsFillPauseFill}/>
                                    :
                                    <Icon color={"#252525"} fontSize={32} as={BsFillPlayFill}/>
                            }
                        </VStack>
                        <Icon onClick={handelNext} color={"#D9D9D9"} fontSize={30} as={BsSkipEndFill}/>

                    </HStack>


                </HStack>


            </Stack>


        </HStack>
    );
};

