import { Stack } from "@chakra-ui/react";
import { TCollection, TCollectionContext } from "../TCollection";
import { useContext } from "react";
import Songs from "../Common/Songs/Songs";
import { CollectionContext } from "../../../provider/CollectionProvider/CollectionProvider";
const ReceLike = () => {
  const { collectionInfo }: TCollectionContext = useContext(CollectionContext);
  return (
    <Stack h={"full"} spacing={5} overflow={"auto"}>
      {collectionInfo?.map(
        (
          { song_info }: { song_info: TCollection["song_info"] },
          songsIndex: number
        ) => {
          const props = {
            songs: song_info,
            songsIndex,
          };
          return <Songs key={songsIndex} {...props} />;
        }
      )}
    </Stack>
  );
};

export default ReceLike;
