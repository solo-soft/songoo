import { Grid, Stack } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { TPlaylists } from "../TPlaylists";

const Images = ({ playlist }: { playlist: TPlaylists }) => {
  const router = useRouter();

  //?If the array length is more than 4 or less than that
  const check = playlist.song_info.length < 4;

  return check ? (
    <Stack cursor={"pointer"} bg={"#252525"}>
      <Image
        onClick={() => router.push(`/collection/playlists/${playlist.id}`)}
        width={80}
        height={80}
        layout={"fill"}
        objectFit={"cover"}
        placeholder={"blur"}
        blurDataURL={playlist?.song_info[0]?.album.images[2].url || "/"}
        src={playlist?.song_info[0]?.album.images[0].url || "/"}
      />
    </Stack>
  ) : (
    <Grid cursor={"pointer"} templateColumns={`repeat(2 , 1fr)`} bg={"#252525"}>
      {playlist?.song_info?.slice(0, 4).map((info) => {
        return (
          <Image
            key={info.id}
            onClick={() => router.push(`/collection/playlists/${playlist.id}`)}
            width={80}
            height={80}
            objectFit={"cover"}
            placeholder={"blur"}
            blurDataURL={info?.album.images[2].url || "/"}
            src={info?.album.images[0].url || "/"}
          />
        );
      })}
    </Grid>
  );
};

export default Images;
