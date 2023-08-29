import { useContext, useId } from "react";
import { CollectionContext } from "../../../provider/CollectionProvider";
import Songs from "./Songs/Songs";
import { Grid, Stack } from "@chakra-ui/react";
import Playlists from "./playlists/Playlists";
type TCollectionProperty = "likes" | "recently" | "playlists" | "playlist-songs";

const Conditional = () => {
  const randomId = useId();

  const {
    property,
    interactionsCollections,
    playlistSongs,
    playlistsCollection
  }: { property: TCollectionProperty } =
    useContext(CollectionContext);


  return (
      <>
        {property === "likes" || property === "recently" ? (
            <Stack h={"full"} spacing={5} overflow={"auto"}>
              {interactionsCollections?.map((songs, songsIndex) => (
                  <Songs key={songsIndex} songs={songs} songsIndex={songsIndex} property={property} interactionsCollections={interactionsCollections} />
              ))}
            </Stack>
        ) : null}

        {property === "playlists" ? (
            <Grid templateColumns={"repeat(2, 1fr)"} h={"full"} gap={5} overflow={"auto"}>
              {playlistsCollection?.map((collection) => (
                  <Playlists key={collection.id} collection={collection} property={property} />
              ))}
            </Grid>
        ) : null}

        {property === "playlist-songs" ? (
            <Stack h={"full"} gap={5} overflow={"auto"}>
              {playlistSongs?.[0]?.song_info?.map((songs, songsIndex) => (
                  <Songs key={songsIndex} songs={songs} songsIndex={songsIndex} property={property} playlistSongs={playlistSongs} />
              ))}
            </Stack>
        ) : null}
      </>
  )

};

export default Conditional;
