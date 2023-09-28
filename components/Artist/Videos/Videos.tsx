import Slider from "../Sliders/Slider";
import _ from "lodash";
import { SwiperSlide } from "swiper/react";
import {VStack, useTheme, Stack, Box, Skeleton} from "@chakra-ui/react";
import Title from "../Common/Title";
import Images from "./Images";
import Name from "./Name";
import {swiperMusicVideoSliderBreakPoint} from "../swiperResponsive";
import useFetchSwr from "../../../hooks/useFetchSwr";
import {SCHEMA_YOUTUBE_VIDEO} from "../../../graphQl/query/schema/getVideoByName";
import fetcherQuery from "../../../graphQl/query/fetcher/fetcherQuery";
import {useRouter} from "next/router";
import getVideoByName from "../../../graphQl/query/schema/getVideoByName";


const Videos = ({ artist }) => {

    const {swrFetcher} = useFetchSwr()
    const router = useRouter()



    const { data: youtubeMusicVideo } = swrFetcher(
    ["/query/schema/getVideoByName" , artist],
    ([_ , artist]) => getVideoByName(artist?.name),
    {
        keepPreviousData : true,
        onFocus : false
    }
  );

  const theme = useTheme();
  const {secondary} = _.get(theme, "background.section.artist");

  return (
    <Stack py={[1 , 1 , 5]}>
      <Title cause={"Music Video"} />

        {
            youtubeMusicVideo ?
                <Slider preview={4} height={"auto"} breakpoint={swiperMusicVideoSliderBreakPoint}>
                    {_.filter(youtubeMusicVideo?.information, {
                        type: "video",
                    }).map((video) => {
                        return (
                            <SwiperSlide>
                                <VStack
                                    key={video?.videoId}
                                    bg={secondary}
                                    rounded={15}
                                    spacing={0}
                                    overflow={"hidden"}
                                >
                                    <Images video={video} />
                                    <Name video={video} />
                                </VStack>
                            </SwiperSlide>
                        );
                    })}
                </Slider>
                :
                <Slider preview={4} height={"auto"} breakpoint={swiperMusicVideoSliderBreakPoint}>
                    {
                        [...Array(20)].map((value) => (
                            <SwiperSlide>
                                <Skeleton  bg={secondary}  rounded={15} w={"full"} h={[85 , 130 , 200]}/>
                            </SwiperSlide>
                        ))
                    }
                </Slider>
        }


    </Stack>
  );
};

export default Videos;
