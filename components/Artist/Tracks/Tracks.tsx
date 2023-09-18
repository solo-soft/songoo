import {
  AbsoluteCenter,
  Box,
  Grid,
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
import Controller from "../../#General/Controller";
import Likes from "../../#General/Likes";
import DotsMenu from "../../#General/DotsMenu/DotsMenu";

const Tracks = ({ songs }) => {
  const theme = useTheme();

  const { primary, secondary } = _.get(theme, "background.section.artist");

  return (
    <>
      <Title cause={"Tracks"} />
      <Stack spacing={[3 , 3 , 3]}>
        {songs.tracks.map((track, songsIndex) => {

          console.log(track)

          const props = { track };
          return (
            <HStack
              key={track.id}
              rounded={15}
              role={"group"}
            >
              <Controller
                flex={[1, 1, 0.2]}
                toRecently={true}
                indexOfSongs={songsIndex}
                arrayOfSongs={songs.tracks}
                idsOfSongs={track.id}
              />
                <HStack flex={[5 , 5 , 5]}>
                    <Images {...props} />
                    <Name {...props} />
                </HStack>
              <HStack spacing={5} flex={3}>
                <Duration {...props} />
                <Likes songs={track} />
                <DotsMenu songs={track} />
              </HStack>
            </HStack>
          );
        })}
      </Stack>
    </>
  );
};

export default Tracks;
