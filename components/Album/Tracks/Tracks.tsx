import Items from "./Items/Items";
import { Stack } from "@chakra-ui/react";
import { TSpecificAlbums } from "../TAlbum";

const Tracks = ({ albumInfo }: { albumInfo: TSpecificAlbums | undefined }) => {
  //?Push image in this array
  const controllerData = albumInfo?.albums?.tracks?.items?.map(
    (value: TSpecificAlbums["albums"]["tracks"]["items"][0]) => ({
      ...value,
      album: { ...value.album, images: albumInfo.albums.images },
    })
  );

  return (
    <Stack spacing={2} mb={25}>
      {controllerData?.map((track, index) => (
        <Items
          key={track.id}
          albumInfo={albumInfo}
          track={track}
          trackIndex={index}
        />
      ))}
    </Stack>
  );
};

export default Tracks;
