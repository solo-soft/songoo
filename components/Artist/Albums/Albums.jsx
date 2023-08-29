import { Box, HStack, Text, VStack, Stack, Flex } from "@chakra-ui/react";

import Image from "next/image";
import Slider from "../Sliders/Slider";
import { SwiperSlide } from "swiper/react";

import Title from "../Common/Title";
import Images from "./Images/Images";
import {breakpoint} from "../../../utils/swiperResponsive";
import {useRouter} from "next/router";

const Albums = ({ albums }) => {

    const router = useRouter()


  return (
    <>
      <Stack w={"full"} position={"relative"}>
        <Title cause={"Albums"} />

        <Slider height={210} preview={7} breakpoint={breakpoint}>
          {albums.items.map((items) => {
            const props = { items };
            return (
              <SwiperSlide onClick={() => router.push(`/album/${items.id}`)}>
                <Images {...props} />
              </SwiperSlide>
            );
          })}
        </Slider>
      </Stack>
    </>
  );
};

export default Albums;
