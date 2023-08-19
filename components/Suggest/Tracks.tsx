import {
  Badge,
  Box,
  Grid,
  GridItem,
  HStack,
  Skeleton,
  Stack,
  Text,
  useTheme,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useParallax } from "react-scroll-parallax";
import Controller from "../Dashboard/TopTenTracks/Tracks/Controller";

type tracks = {
  tracks: [
    {
      id: string;
      name: string;
      duration_ms: number;
      preview_url: null | string;
      album: {
        id: string;
        images:
          | [
              {
                url: string;
              }
            ]
          | any;
        name: string;
      };
    }
  ];
};

type songs = {
  __typename: "suggestion";
} & tracks;

const Tracks = ({ songs }: { songs: songs }) => {
  const {
    background: {
      section: {
        one: { secondary, primary },
      },
    },
  } = useTheme();

  const render = songs?.tracks.slice(0, 8).map((value, index) => {
    return (
      <motion.div key={value.id} initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <GridItem
          key={value.id}
          w={160}
          h={160}
          position={"relative"}
          rounded={15}
          overflow={"hidden"}
          bg={primary}
        >
          <Image
            layout={"fill"}
            sizes={"(max-width: 450px)"}
            objectFit={"cover"}
            alt={value?.name}
            blurDataURL={value?.album?.images?.[2]?.url}
            placeholder={"blur"}
            src={value?.album?.images?.[0]?.url}
          />

          <HStack
            w={"full"}
            h={35}
            px={2}
            role={"group"}
            justify={"space-between"}
            position={"absolute"}
            bg={"blackAlpha.700"}
            bottom={0}
          >
              <Text flex={3} fontSize={"xs"} noOfLines={1}>
                  {value.name}
              </Text>

            <Controller
              toRecently={true}
              arrayOfSongs={songs.tracks}
              indexOfSongs={index}
              idsOfSongs={value.id}
              flex={1}
            />

          </HStack>
        </GridItem>
      </motion.div>
    );
  });

  return (
    <Stack spacing={3}>
      <HStack>
        <Box py={2} px={4} fontSize={"sm"} rounded={40} bg={"#252525"}>
          Taylor swift
        </Box>
        <Box py={2} px={4} fontSize={"sm"} rounded={40} bg={"#252525"}>
          Imagen dragons
        </Box>
      </HStack>
      <HStack height={400} p={25} bg={secondary} rounded={25}>
        <Grid
          templateColumns="repeat(4, 1fr)"
          templateRows="repeat(2, 1fr)"
          gap={2}
        >
          {render}
        </Grid>
      </HStack>
    </Stack>
  );
};

export default Tracks;
