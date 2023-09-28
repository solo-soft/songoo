import { Box, HStack, Text, VStack, Stack, Flex } from "@chakra-ui/react";

import Image from "next/image";
import Slider from "../Sliders/Slider";
import { SwiperSlide } from "swiper/react";

import Title from "../Common/Title";
import Images from "./Images/Images";
import {swiperAlbumsSliderBreakPoint} from "../swiperResponsive";
import {useRouter} from "next/router";

const Albums = ({ albums }) => {

    const router = useRouter()

  return (

      <Stack py={[1 , 1 , 5]} w={"full"} position={"relative"}>
        <Title cause={"Albums"} />
        <Slider height={"auto"} preview={7} breakpoint={swiperAlbumsSliderBreakPoint}>
          {albums?.items?.map((items) => {
            const props = { items };
            return (
              <SwiperSlide onClick={() => router.push(`/album/${items.id}`)}>
                <Images {...props} />
              </SwiperSlide>
            );
          })}
        </Slider>
      </Stack>

  );
};

export default Albums;
