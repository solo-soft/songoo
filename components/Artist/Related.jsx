import { useRef } from "react";
import { Box, HStack, Stack, Text, useTheme, VStack } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper";
import Image from "next/image";
import { useRouter } from "next/router";
import MySwiperControls from "./MySwiperControls";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import _ from "lodash";
import Title from "./Common/Title";
import Slider from "./Sliders/Slider";
import { swiperMostRelatedBreakPoint } from "./swiperResponsive";

const Related = ({ related }) => {
  const router = useRouter();
  const theme = useTheme();
  const { primary, secondary } = _.get(theme, "background.section.artist");
  return (
    <Stack py={[1, 1, 5]}>
      <Title cause={"Most Related"} />
      <Slider height={"auto"} breakpoint={swiperMostRelatedBreakPoint}>
        {related?.artists?.map((related) => {
          return (
            <SwiperSlide key={related.id}>
              <Stack
                onClick={() =>
                  router.replace(`/artist/${related.id}`, undefined, {
                    scroll: false,
                  })
                }
                bg={"whiteAlpha.200"}
                boxShadow={"dark-lg"}
                position={"relative"}
                w={"full"}
                h={[110, 150, 195]}
                rounded={15}
                overflow={"hidden"}
              >
                <Image
                  style={{ transition: ".5s" }}
                  src={related?.images[0]?.url}
                  loading={"lazy"}
                  placeholder={"blur"}
                  blurDataURL={related?.images[1]?.url}
                  layout={"fill"}
                  objectFit={"cover"}
                />

                <Text
                  bottom={0}
                  w={"full"}
                  textAlign={"center"}
                  position={"absolute"}
                  bg={secondary}
                  p={1}
                  fontSize={"sm"}
                  noOfLines={1}
                  fontWeight={"bold"}
                >
                  {related.name}
                </Text>
              </Stack>
            </SwiperSlide>
          );
        })}
      </Slider>
    </Stack>
  );
};

export default Related;
