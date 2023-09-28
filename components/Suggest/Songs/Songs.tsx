import {
  Grid,
  GridItem,
  Hide,
  HStack,
  Stack,
  Text,
  useTheme,
} from "@chakra-ui/react";
import Image from "next/image";
import { motion } from "framer-motion";
import Controller from "../../#General/Controller";
import { TImages, TSongs } from "../../TMainData";
import _ from "lodash";

const Songs = ({ songs }: { songs: TSongs | undefined}) => {
  const theme = useTheme();
  const { primary, tertiary } = _.get(theme, "background.section.suggest");
  const render: JSX.Element[] | undefined = songs?.tracks?.map(
    (song, index: number) => {
      return (
        <motion.div key={song.id} initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <GridItem
            key={song.id}
            w={["full", "full", "full", 130, 160]}
            h={[65, 87, 130, 130, 160]}
            position={"relative"}
            rounded={[15, 5, 5, 15]}
            overflow={"hidden"}
            bg={primary}
          >
            <Image
               style={{transition : ".5s"}}
              layout={"fill"}
              sizes={"(max-width: 450px)"}
              objectFit={"cover"}
              alt={song?.name}
              blurDataURL={song?.album?.images?.[2]?.url || "/"}
              placeholder={"blur"}
              src={song?.album?.images?.[0]?.url || "/"}
            />

            <HStack
              w={"full"}
              h={[5, 5, 35]}
              px={[0, 1, 2]}
              role={"group"}
              justify={"space-between"}
              position={"absolute"}
              bg={"blackAlpha.700"}
              bottom={0}
            >
              <Hide below={"sm"}>
                <Text flex={[0 , 1 , 3 , 3]} fontSize={"xs"} noOfLines={1}>
                  {song.name}
                </Text>
              </Hide>

              <Controller
                toRecently={true}
                arrayOfSongs={songs.tracks}
                indexOfSongs={index}
                idsOfSongs={song.id}
                iconSize={["md", "md", "lg"]}
                flex={1}
              />
            </HStack>
          </GridItem>
        </motion.div>
      );
    }
  );

  return (
    <Stack order={[2, 2 , 2, 3]}>
      <Stack
        height={["auto", "auto", "full", "full"]}
        justify={"center"}
        p={[5, 5, 2, 15]}
        bg={tertiary}
        rounded={15}
      >
        <Grid
          templateColumns={[
            "repeat(4, 1fr)",
            "repeat(4, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
            "repeat(5, 1fr)",
          ]}
          gap={2}
        >
          {render}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Songs;
