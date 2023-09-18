import useSWR from "swr";
import getVideoByName from "../../../graphQl/query/schema/getVideoByName";
import { toast } from "react-toastify";
import Slider from "../Sliders/Slider";
import _ from "lodash";
import { SwiperSlide } from "swiper/react";
import {HStack, Icon, Text, VStack, Img, useTheme, Stack} from "@chakra-ui/react";
import { AiOutlineSave } from "react-icons/ai";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { YOUTUBE_SAVE_LIST } from "../../../recoil/atoms/atoms";
import Title from "../Common/Title";
import Images from "./Images";
import Name from "./Name";
import {swiperMusicVideoSliderBreakPoint} from "../../../utils/swiperResponsive";

const Videos = ({ artist }) => {
  const [thumbnails, setThumbnails] = useState<string | null>(null);

  const { data: youtubeMusicVideo, error } = useSWR(
    ["/query/schema/getVideoByName", artist],
    ([_, artist]) => getVideoByName(artist.name),
    {
      refreshInterval: undefined,
      revalidateOnFocus: false,
      onError: () => {
        toast.error("Connection Lost");
      },
    }
  );

  const theme = useTheme();
  const {secondary} = _.get(theme, "background.section.artist");

  return (
    <Stack py={[1 , 1 , 5]}>
      <Title cause={"Music Video"} />
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
    </Stack>
  );
};

export default Videos;
