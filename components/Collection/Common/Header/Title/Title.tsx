import { Stack, Text, useTheme } from "@chakra-ui/react";
import { useContext } from "react";
import _ from "lodash";
import { TCollectionContext } from "../../../TCollection";
import { CollectionContext } from "../../../../../provider/CollectionProvider/CollectionProvider";
import { titleIdentifier } from "./titleIdentifier";

const Title = () => {
  const theme = useTheme();

  const { property, collectionInfo }: TCollectionContext =
    useContext(CollectionContext);

  const fontColor = _.get(theme, `font.color.section.${property}`);

  const check = property === "playlist-songs";

  const title =
    property === "playlist-songs"
      ? collectionInfo?.[0]?.title
      : titleIdentifier(property);

  return (
    <Stack spacing={0} align={["center", "center", "center"]}>
      <Text
        fontSize={["4xl", "5xl", "6xl", "8xl"]}
        fontWeight={"bold"}
        bgGradient={`linear(to-l, ${fontColor?.secondary}, #ffff)`}
        bgClip="text"
      >
        {title}
      </Text>

      <Text
        as={"b"}
        fontSize={"xs"}
        position={"absolute"}
        bottom={2}
        left={5}
        color={fontColor?.tertiary}
      >
        Include{" "}
        {check
          ? collectionInfo?.[0]?.song_info?.length
          : collectionInfo?.length}{" "}
        {property === "playlists" ? "playlists" : "songs"}
      </Text>
    </Stack>
  );
};

export default Title;
