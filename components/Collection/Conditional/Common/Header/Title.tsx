import { HStack, Icon, Stack, Text, useTheme, VStack } from "@chakra-ui/react";
import { FC, useContext, useEffect, useState } from "react";
import { CollectionContext } from "../../../../../provider/CollectionProvider";
import { AiFillHeart, AiFillSave, AiOutlineHistory } from "react-icons/ai";
import _ from "lodash";
import { TSession } from "../../../../TSession";
import useSWR from "swr";
import { IconType } from "react-icons";

type TCollectionProperty = "likes" | "recently" | "playlists" | "playlist-songs";

const Title = () => {
  const theme = useTheme();

  const {
    property,
    interactionsCollections,
    playlistSongs
  }: { property: TCollectionProperty } = useContext(CollectionContext);

  const [title, setTitle] = useState<string>("");

  const { data: session }: { data: TSession | undefined } = useSWR(
    "/api/getUserSession"
  );

  const fontColor = _.get(theme, `font.color.section.${property}`);

  const check = property === "playlist-songs"

  useEffect(() => {
    switch (property) {
      case "likes":
        setTitle("Your liked songs");
        break;
      case "recently":
        setTitle("Your Recently Played");
        break;
      case "playlists":
        setTitle("Your Playlists");
        break;
      case "playlist-songs":
        setTitle(`Playlist`);
        break;
      default:
        break;
    }
  }, [property]);




  return (
    <Stack flex={0.5} spacing={0} align={["center" , "center" , "flex-start"]}>

        <Text fontSize={["2xl" , "2xl" , "5xl"]} fontWeight={"bold"} color={fontColor?.primary}>
          {title} {playlistSongs?.[0].title}
        </Text>

      <Text fontSize={"xs"} color={fontColor?.primary}>
        Include {check ? playlistSongs?.[0]?.song_info?.length : interactionsCollections?.length}{" "}
        {property === "playlists" ? "playlists" : "songs"} created by{" "}
        {session?.user.email}{" "}
      </Text>
    </Stack>
  );
};

export default Title;
