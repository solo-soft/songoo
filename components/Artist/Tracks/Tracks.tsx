import {
  AbsoluteCenter,
  Box, Center, Divider,
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
import React from "react";
import {TSongs} from "../TArist";
import useSWR from "swr";

const Tracks = ({ songs } : {songs : TSongs | undefined}) => {

  const theme = useTheme();

  const { primary, secondary } = _.get(theme, "background.section.artist");
  const { data: session } = useSWR("/api/getUserSession");


  return (
    <>
      <Title cause={"Tracks"} />
      <Stack spacing={[3 , 3 , 3]}>
        {songs?.tracks?.map((track, songsIndex) => {
          const props = { track };
          return (
            <HStack
              key={track.id}
              rounded={15}
              role={"group"}
              bg={"#111111"}
              p={2}
            >
              <HStack flex={[3 , 2 , 1 , 1 , .5]}>
              <Images {...props} />
              <Name {...props} />
            </HStack>
              <Center height="50px">
                <Divider borderWidth={2} rounded={50} orientation="vertical" />
              </Center>
              <Controller
                session={session}
                flex={[.2 , .5 , .2 , .15 ]}
                iconSize={[25 , 25 ,35]}
                toRecently={true}
                indexOfSongs={songsIndex}
                arrayOfSongs={songs.tracks}
                idsOfSongs={track.id}
              />

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
