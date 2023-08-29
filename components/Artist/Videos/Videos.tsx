import useSWR from "swr";
import getVideoByName from "../../../graphQl/query/schema/getVideoByName";
import { toast } from "react-toastify";
import Slider from "../Sliders/Slider";
import _ from "lodash";
import { SwiperSlide } from "swiper/react";
import { HStack, Icon, Text, VStack, Img, useTheme } from "@chakra-ui/react";
import { AiOutlineSave } from "react-icons/ai";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { YOUTUBE_SAVE_LIST } from "../../../recoil/atoms/atoms";
import Title from "../Common/Title";
import Images from "./Images";
import Name from "./Name";

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
    <>
      <Title cause={"Video Music"} />
      <Slider preview={4} height={250}>
        {_.filter(youtubeMusicVideo?.information?.contents, {
          type: "video",
        }).map(({ video }) => {
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
    </>
  );
};

export default Videos;
