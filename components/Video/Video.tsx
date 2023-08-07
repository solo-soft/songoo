import React, {useState} from 'react';
import {Grid, HStack, Icon, Image, Stack, Text, useTheme, VStack} from "@chakra-ui/react";
import useSWR from "swr";
import {useRecoilState, useRecoilValue} from "recoil";
import {ARTISTS_NAME, YOUTUBE_SAVE_LIST} from "../../recoil/atoms/atoms";
import {toast} from "react-toastify";
import getVideoByName from "../../graphQl/query/schema/getVideoByName";
import {AiOutlineSave} from "react-icons/ai"
import setUserVideoSaved from "../../supabase/inserts/setUserVideoSaved";
import getUserVideoSaved from "../../supabase/reads/getUserVideoSaved";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';


type saveList = Array<{
    videoId: string
    title: string
    thumbnails: Array<{ url: string }>
}>

interface IVideoInfo {
    type: string
    video: {
        title: string,
        videoId: string
        publishedTimeText: string
        thumbnails: Array<{ url: string }>
        movingThumbnails: Array<{ url: string }>
    }
}


const Video = ({randomSingerUS}: { randomSingerUS: string }) => {


    const {background: {section: {three: {primary}}}} = useTheme()

    const [thumbnails, setThumbnails] = useState<string | null>(null)

    const [saveVideoList, setVideoList] = useRecoilState<saveList | []>(YOUTUBE_SAVE_LIST)

    const singerName = useRecoilValue<undefined | string>(ARTISTS_NAME);

    const {data: session} = useSWR('/api/getUserSession')


    const {data: youtubeMusicVideo} = useSWR(
        ["/query/schema/getVideoByName", randomSingerUS, singerName],
        ([_, randomSingerUS, singerName]) => getVideoByName(randomSingerUS, singerName),
        {
            refreshInterval: undefined,
            revalidateOnFocus: false,

            onError: () => {
                toast.error('Connection Lost', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        })


    const {data, error, mutate}: { data: any, error: any, mutate: any } = useSWR(
        "/supabase/reads/getUserVideoSaved",
        () => getUserVideoSaved(session))


    const handelOnClick = async (value: IVideoInfo) => {

        const videoInfo = {
            userId: session.user.id,
            email: session.user.email,
            videoInfo: {
                videoId: value.video.videoId,
                title: value.video.title,
                thumbnails: value.video.thumbnails
            }
        }

        try {
            await mutate(setUserVideoSaved(videoInfo), {
                optimisticData: [...data, videoInfo],
                rollbackOnError: true,
                populateCache: false,
                revalidate: false
            })
            toast.success("Successfully added the new item.");
        } catch (e) {
            toast.error("Failed to add the new item.");
        }


    }


    return (
        <VStack p={5} h={"100vh"} m={"auto"} bg={"#410202"}>
            <Text fontSize={"4xl"} fontWeight={"bold"} w={"full"}>Watch some video
                from {singerName || randomSingerUS}</Text>
            <HStack>
                <Grid flex={saveVideoList.length ? 4 : "auto"} gap={5} h={"34rem"} templateColumns={"repeat(3,1fr)"}
                      maxW={"5xl"} m={"auto"} overflow={"auto"}>
                    {
                        youtubeMusicVideo?.information?.contents?.filter((value: IVideoInfo) => value.type === "video").map((value: IVideoInfo, index: number) => {
                            return (
                                <VStack bg={"#501616"} p={3} rounded={15} justifyContent={"space-between"}
                                        key={value?.video?.videoId}>
                                    <VStack>

                                        <img
                                            onMouseOver={() => setThumbnails(value?.video?.videoId)}
                                            onMouseLeave={() => setThumbnails(null)}
                                            onError={(e) => {
                                                return e.target.src = "/brokenImage.png"
                                            }}
                                            style={{
                                                height: saveVideoList.length ? 150 : 180,
                                                objectFit: "cover",
                                                borderRadius: 10,
                                                cursor: "pointer"
                                            }}
                                            src={
                                                thumbnails === value?.video?.videoId ?
                                                    value?.video?.movingThumbnails?.[0]?.url || value?.video?.thumbnails?.[1]?.url
                                                    :
                                                    value?.video?.thumbnails?.[1]?.url || value?.video?.thumbnails?.[0]?.url
                                            }/>


                                        <Text noOfLines={2} fontSize={"small"}
                                              textAlign={"center"}>{value?.video?.title}</Text>
                                    </VStack>

                                    <HStack>
                                        <VStack onClick={() => handelOnClick(value)} p={2} rounded={50} bg={"#252525"}>
                                            <Icon as={AiOutlineSave} fontSize={20}/>
                                        </VStack>
                                    </HStack>

                                </VStack>
                            )
                        })
                    }
                </Grid>


                <Stack h={"33rem"} overflow={"auto"} flex={1} justifyContent={"flex-start"}>
                    {

                        data && data?.map((value) => {
                            return (
                                <HStack key={value.id}>
                                    <Image
                                        onError={(e) => {
                                            return e.target.src = "/brokenImage.png"
                                        }}
                                        w={140} src={value?.videoInfo?.thumbnails?.[0]?.url}/>
                                    <Text fontSize={"small"} noOfLines={1} w={150}>{value?.videoInfo?.title}</Text>
                                </HStack>
                            )
                        })
                    }
                </Stack>
            </HStack>
        </VStack>
    );
};

export default Video;
