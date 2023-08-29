import { useRef } from "react";
import {Box, HStack, Stack, Text, useTheme, VStack} from "@chakra-ui/react";
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
import {breakpoint} from "../../utils/swiperResponsive";


const Related = ({ related }) => {
  const { push } = useRouter();

  const swiperRef = useRef(null);

  const theme = useTheme()
  const { primary, secondary } = _.get(theme, "background.section.artist");

  return (
    <>

      <HStack>
        <Title cause={"Most Related"}/>
        <MySwiperControls
          onPrev={() => swiperRef.current.slidePrev()}
          onNext={() => swiperRef.current.slideNext()}
        />
      </HStack>




      <Slider height={210} preview={7} breakpoint={breakpoint}>

        {
          related.artists.map((related) => {
            return (
                <SwiperSlide key={related.id} >
                  <Stack
                      onClick={() => push(`/artist/${related.id}`)}
                      bg={"whiteAlpha.200"}
                      boxShadow={"dark-lg"}
                      position={"relative"}
                      width={{sm : 180 , md : 190}}
                      height={{sm : 180 , md : 190}}
                      rounded={15}
                      overflow={"hidden"}
                  >

                    <Image
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
            )
          } )
        }

      </Slider>







    </>
  );
};

export default Related;
