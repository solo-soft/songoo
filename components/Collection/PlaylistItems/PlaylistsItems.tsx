import { useContext } from "react";
import Songs from "../Common/Songs/Songs";
import { Stack } from "@chakra-ui/react";
import { CollectionContext } from "../../../provider/CollectionProvider/CollectionProvider";
import { TCollection, TCollectionContext } from "../TCollection";

const PlaylistsItems = () => {
  const { collectionInfo }: TCollectionContext = useContext(CollectionContext);
  return (
    <Stack spacing={5}>
      {collectionInfo?.[0]?.song_info.map(
        (songs: Partial<TCollection["song_info"]>, songsIndex: number) => {
          const props = {
            songs,
            songsIndex,
          };
          return <Songs key={songsIndex} {...props} />;
        }
      )}
    </Stack>
  );
};

export default PlaylistsItems;
