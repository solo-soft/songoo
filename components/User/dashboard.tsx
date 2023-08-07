import {
    Box, Button,
    Grid,
    HStack,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import useSWR from "swr";
import getUserSubscriptions from "../../supabase/reads/getUserSubscriptions";
import Image from "next/image";
import getArtistInfoById from "../../graphQl/query/schema/getArtistInfoById";
import {useEffect, useState} from "react";
import prettyMilliseconds from "pretty-ms";
import {
    CONTROL_PLAYBACK,
    CURRENT_SELECTED_MUSIC_ID,
    IS_PLAYING,
    PLAYBACK_REF,
    TIME_LEFT
} from "../../recoil/atoms/atoms";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {BsDot, BsFillPauseFill, BsFillPlayFill, BsHeart, BsThreeDots} from "react-icons/bs"
import {ScaleLoader} from "react-spinners";
import setUserRecentlyPlayed from "../../supabase/inserts/setUserRecentlyPlayed";
import {v4 as uuidv4} from 'uuid';
import getUserRecentlyPlayed from "../../supabase/reads/getUserRecentlyPlayed";
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode} from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import {motion} from "framer-motion";
import {css} from "@emotion/css";
import styled from '@emotion/styled'

const Dashboard = () => {


    const [playbackList, setPlaybackList] = useRecoilState(CONTROL_PLAYBACK)

    const [isPlaying, setIsPlaying] = useRecoilState(IS_PLAYING)

    const setResetTimeLeft = useSetRecoilState(TIME_LEFT)

    const playbackRef = useRecoilValue(PLAYBACK_REF)

    const [selected, setSelect] = useRecoilState(CURRENT_SELECTED_MUSIC_ID)


    const {data: session} = useSWR("/api/getUserSession")

    const {
        data: subscriptions,
        error
    } = useSWR("/supabase/reads/getUserSubscription", () => getUserSubscriptions(session))

    const {
        data: recentlyPlayed,
        error: ERRORs,
        mutate
    } = useSWR("/supabase/reads/getUserRecentlyPlayed", () => getUserRecentlyPlayed(session))


    const [singerId, setSingerId] = useState<string | null>(null)

    const {data: singerInfo,} = useSWR(
        ['/query/schema/getArtistInfoById', singerId],
        singerId ? ([_, singerId]) => getArtistInfoById(singerId) : null)


    useEffect(() => {
        setSingerId(subscriptions?.[0].singer.id)
    }, [subscriptions])


    const handelPlay = (index, value) => {

        const songInfo = {
            id: uuidv4(),
            userId: session.user.id,
            recently_played: value,
            created_at: new Date()
        }
        setSelect(value.id)
        setPlaybackList({index, list: singerInfo?.songs?.tracks})
        setResetTimeLeft(0)
        setIsPlaying(true)
        playbackRef?.play();

        return mutate(setUserRecentlyPlayed(songInfo), {
            optimisticData: [...recentlyPlayed, songInfo],
            rollbackOnError: true,
            populateCache: false,
            revalidate: true
        })
    }


    const handelPause = () => {
        setIsPlaying(false)
        playbackRef?.pause();
    }


    const imageStyles = css`
      transition: .5s ease-in-out;

      &:hover {
        transform: scale(1.3);
      }
    `;


    return (


        <VStack h={"100vh"}  justifyContent={"center"} maxW={1450} m={"auto"}>


            <Swiper
                slidesPerView={8}
                spaceBetween={90}
                pagination={false}
                freeMode={true}
                modules={[FreeMode]}
                style={{width: "100%"}}
            >
                {
                    subscriptions?.map((value) => {

                        const check = singerId === value.singer.id

                        return (
                            <SwiperSlide>
                                <Box key={value.id}
                                     w={180}
                                     h={180}
                                     flex={"0 0 auto"}
                                     rounded={10}
                                     overflow={"hidden"}
                                     position={"relative"}
                                     bg={"#252525"}
                                     cursor={"pointer"}
                                >
                                    <Image
                                        src={value.singer.images[0].url}
                                        layout={"fill"}
                                        objectFit={"cover"}
                                        className={imageStyles}
                                        onClick={() => setSingerId(value.singer.id)}
                                    />

                                    <HStack
                                        w={"full"}
                                        p={3}
                                        justifyContent={"space-between"}
                                        bg={"blackAlpha.800"}
                                        position={"absolute"}
                                        bottom={0}>
                                        <Text
                                            noOfLines={1}
                                            fontSize={"sm"}
                                            fontWeight={check ? "bold" : "light"}
                                            color={check ? "#7886FF" : "white"}>
                                            {value.singer.name}
                                        </Text>
                                        {/*<Icon fontWeight={"bold"} fontSize={"xl"} as={BsThreeDots} />*/}
                                        <Button size={"xs"}>
                                            See more
                                        </Button>
                                    </HStack>

                                </Box>
                            </SwiperSlide>
                        )
                    })
                }

            </Swiper>

            <HStack w={"full"} justifyContent={"space-between"}>

                <Stack flex={2} bgGradient='linear(to-b, purple.900 , black)' rounded={5} h={"full"} p={2}>

                    <Text fontWeight={"light"} fontSize={25}>
                        Top 10 Tracks of <b>{singerInfo?.artist?.name}</b>
                    </Text>

                    <Stack h={330} spacing={0}  overflow={"auto"}>

                        {
                            singerInfo?.songs?.tracks.map((value, index) => {

                                const check = isPlaying && value.id === selected

                                return (
                                    <HStack role={"group"}
                                            _hover={{bg: "blackAlpha.300"}}
                                            rounded={10}
                                            key={value.id}
                                            justifyContent={"space-between"}>


                                        <VStack flex={1}>
                                            {
                                                check ?
                                                    <>
                                                        <Icon display={"none"} _groupHover={{display: "block"}}
                                                              fontSize={"lg"} onClick={handelPause}
                                                              as={BsFillPauseFill}/>
                                                        <Box display={"block"} _groupHover={{display: "none"}}>
                                                            <ScaleLoader speedMultiplier={3} width={2} height={10}
                                                                         color={"#7886FF"}/>
                                                        </Box>

                                                    </>
                                                    :
                                                    <Icon fontSize={"lg"} onClick={() => handelPlay(index, value)}
                                                          as={BsFillPlayFill}/>
                                            }
                                        </VStack>


                                        <Stack position={"relative"} p={8} rounded={5} overflow={"hidden"}
                                               bg={"#252525"}>
                                            <Image src={value.album.images[0].url} objectFit={"cover"} layout={"fill"}/>
                                        </Stack>

                                        <Stack flex={5}>
                                            <Text noOfLines={1} fontSize={"sm"} fontWeight={"bold"}
                                                  color={check ? "#7886FF" : "white"}>{value.name}</Text>
                                        </Stack>

                                        <Stack flex={10} position={"relative"} p={7} rounded={8} overflow={"hidden"}>
                                            <Text noOfLines={1} fontSize={"xs"}
                                                  color={"white"}>{value.album.name}</Text>
                                        </Stack>


                                        <HStack flex={3} justifyContent={"space-between"} p={7} rounded={8}>
                                            <Icon fontSize={"sm"} onClick={handelPause} as={BsHeart}/>
                                            <Text fontSize={"xs"}>{prettyMilliseconds(value.duration_ms, {
                                                    colonNotation: true,
                                                    secondsDecimalDigits: 0
                                                }
                                            )
                                            }
                                            </Text>


                                            <Menu placement={"left"} size={"sm"} gutter={1}>
                                                <MenuButton
                                                    w={5}
                                                    h={5}
                                                    as={IconButton}
                                                    aria-label='Options'
                                                    icon={<BsThreeDots/>}
                                                    variant='shadow'
                                                />

                                                <MenuList bg={"#171717"}>
                                                    <MenuItem _hover={{bg: "whiteAlpha.100"}}>Add to playlist</MenuItem>

                                                    <MenuItem _hover={{bg: "whiteAlpha.100"}}>Save to your Liked
                                                        Songs</MenuItem>
                                                    <MenuDivider/>
                                                    <MenuItem _hover={{bg: "whiteAlpha.100"}}>Go to artist</MenuItem>
                                                    <MenuItem _hover={{bg: "whiteAlpha.100"}}>Go to album</MenuItem>
                                                    <MenuDivider/>
                                                    <MenuItem _hover={{bg: "whiteAlpha.100"}}>Share</MenuItem>
                                                </MenuList>
                                            </Menu>

                                        </HStack>


                                    </HStack>
                                )
                            })
                        }

                    </Stack>

                </Stack>


                <Stack flex={1} h={"full"} p={2} bgGradient='linear(to-b, pink.900, black)'>

                    <Text fontWeight={"light"} fontSize={25}>Recently Played</Text>

                    <Grid gap={1} templateColumns={"repeat(3 , 1fr)"}>

                        {
                            recentlyPlayed?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 6).map((value, index, array) => {

                                const {id, recently_played} = value

                                return (
                                    <HStack bg={"#252525"}>
                                        <Box p={8} bg={"#693672"} position={"relative"}>
                                            <Image src={recently_played.album.images[0].url}
                                                   layout={"fill"}
                                                   objectFit={"cover"}/>
                                        </Box>
                                        <Text noOfLines={1} fontWeight={"bold"}
                                              fontSize={12}>{recently_played.name}</Text>
                                    </HStack>
                                )
                            })
                        }

                    </Grid>


                    <Text fontWeight={"light"} fontSize={25}>Your Playlists</Text>

                    <HStack>
                        {
                            [...Array(4)].map(() => {
                                return (
                                    <Box p={65} bg={"#252525"}/>
                                )
                            })
                        }
                    </HStack>

                </Stack>
            </HStack>
        </VStack>


    );
};

export default Dashboard;
