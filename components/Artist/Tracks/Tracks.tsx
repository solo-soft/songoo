import {
  AbsoluteCenter,
  Box,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Slider from "../Sliders/Slider";
import { SwiperSlide } from "swiper/react";
import Images from "./Images";
import { useTheme } from "@chakra-ui/react";
import _ from "lodash";
import Name from "./Name";
import Duration from "./Duration";
import Title from "../Common/Title";

const Tracks = ({ songs }) => {
  const theme = useTheme();

  const { primary, secondary } = _.get(theme, "background.section.artist");

  return (
    <>
      <Title cause={"Tracks"} />
      <Slider height={85} preview={4}>
        {songs.tracks.map((track, index) => {
          const props = {track  };
          return (
            <SwiperSlide key={track.id}>
              <HStack p={2} rounded={15} bg={secondary}>
                <Images {...props}/>
                <Name {...props} />
                <Duration {...props} />
              </HStack>
            </SwiperSlide>
          );
        })}
      </Slider>
    </>
  );
};

export default Tracks;
