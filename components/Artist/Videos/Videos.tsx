import Slider from "../Sliders/Slider";
import _ from "lodash";
import { SwiperSlide } from "swiper/react";
import { VStack, useTheme, Stack, Box, Skeleton } from "@chakra-ui/react";
import Title from "../Common/Title";
import Images from "./Images";
import Name from "./Name";
import { swiperMusicVideoSliderBreakPoint } from "../swiperResponsive";
import useFetchSwr from "../../../hooks/useFetchSwr";
import { SCHEMA_YOUTUBE_VIDEO } from "../../../graphQl/query/schema/getVideoByName";
import fetcherQuery from "../../../graphQl/query/fetcher/fetcherQuery";
import { useRouter } from "next/router";
import getVideoByName from "../../../graphQl/query/schema/getVideoByName";
import { TArtist } from "../TArist";

const Videos = ({ artist }: { artist: TArtist | undefined }) => {
  const { swrFetcher } = useFetchSwr();

  const { data: youtubeMusicVideo }: { data: TYoutubeMusicVideo | undefined } =
    swrFetcher<TYoutubeMusicVideo | undefined>(
      ["/query/schema/getVideoByName", artist],
      ([_, artist]) => getVideoByName(artist?.name),
      {
        keepPreviousData: true,
        onFocus: false,
      }
    );

  const theme = useTheme();
  const { secondary } = _.get(theme, "background.section.artist");

  return (
    <Stack py={[1, 1, 5]}>
      <Title cause={"Music Video"} />

      {youtubeMusicVideo ? (
        <Slider
          preview={4}
          breakpoint={swiperMusicVideoSliderBreakPoint}
        >
          {_.filter(youtubeMusicVideo?.information, {
            type: "video",
          }).map((video : TYoutubeMusicVideo["information"]) => {
            return (
              <SwiperSlide key={video.videoId}>
                <VStack
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
      ) : (
        <Slider
          preview={4}
          breakpoint={swiperMusicVideoSliderBreakPoint}
        >
          {[...Array(20)].map((_ ,index) => (
            <SwiperSlide key={index}>
              <Skeleton
                bg={secondary}
                rounded={15}
                w={"full"}
                h={[85, 130, 200]}
              />
            </SwiperSlide>
          ))}
        </Slider>
      )}
    </Stack>
  );
};

export default Videos;

export type TYoutubeMusicVideo = {
  information: {
    __typename: string;
    type: string;
    title: string | null;
    videoId: string | null;
    author: string;
    authorId: string;
    authorUrl: string;
    videoThumbnails:
      | {
          quality: string;
          url: string;
          width: number;
          height: number;
        }[]
      | null;
    description: string;
    descriptionHtml: string;
    viewCount: number | null;
    published: number | null;
    publishedText: string | null;
    lengthSeconds: number | null;
    liveNow: boolean | null;
    paid: any | null; // Change 'any' to the actual type if needed
    premium: boolean | null;
  };
};
