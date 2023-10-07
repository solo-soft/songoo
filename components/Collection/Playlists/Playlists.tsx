import {Box, Grid , useTheme} from "@chakra-ui/react";
import Title from "./Title/Title";
import Images from "./Images/Images";
import { useRouter } from "next/router";
import { useContext } from "react";
import { CollectionContext } from "../../../provider/CollectionProvider/CollectionProvider";
import { TCollection, TCollectionContext } from "../TCollection";
import _ from "lodash";
import Tilt from "react-parallax-tilt";

const Playlists = () => {
  const { property, collectionInfo }: TCollectionContext =
    useContext(CollectionContext);

  const theme = useTheme();
  const router = useRouter();

  const fontColor = _.get(theme, `font.color.section.${property}`);



  return (
    <Grid
      templateColumns={{
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
        xl: "repeat(5, 1fr)",
      }}
      h={"full"}
      gap={5}
      overflow={"hidden"}
      mb={20}
    >
      {collectionInfo?.map((collection: TCollection) => {
        return (
          <Box
            key={collection.id}
            cursor={"pointer"}
            bg={"#111111"}
            position={"relative"}
            rounded={5}
            onClick={() =>
              router.push(`/collection/playlists/${collection.id}`)
            }
            overflow={"hidden"}
          >
            <Tilt
              tiltEnable={false}
              glareEnable={true}
              glareMaxOpacity={0.3}
              scale={1.10}
              glarePosition="all"
              glareColor={fontColor?.secondary}
            >
              <Images collection={collection} />
              <Title collection={collection} />
            </Tilt>
          </Box>
        );
      })}
    </Grid>
  );
};

export default Playlists;
