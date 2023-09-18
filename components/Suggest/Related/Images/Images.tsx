import { Stack } from "@chakra-ui/react";
import Image from "next/image";
import { TArtist } from "../../../TMainData";
import { useSetRecoilState } from "recoil";
import {
  ARTISTS_ID,
  ARTISTS_NAME,
  STATUS,
} from "../../../../recoil/atoms/atoms";

const Images = ({ artist }: { artist: TArtist }) => {
  const setArtistId = useSetRecoilState<string | undefined>(ARTISTS_ID);
  const setArtistsName = useSetRecoilState<string | undefined>(ARTISTS_NAME);
  const setStatus = useSetRecoilState<string>(STATUS);

  return (
    <Stack
      key={artist?.id}
      w={[65, 85 , 115 , 58]}
      h={[65, 85 , 115 , 58]}
      cursor={"pointer"}
      position={"relative"}
      rounded={["full", "full" , "full", 5 , 10]}
      overflow={"hidden"}
      bg={"#252525"}
    >
      <Image
        layout={"fill"}
        sizes={"(max-width: 450px)"}
        objectFit={"cover"}
        placeholder={"blur"}
        src={artist?.images?.[2]?.url || "/"}
        blurDataURL={artist?.images?.[2]?.url || "/"}
        alt={artist?.name}
        onClick={() => {
          setStatus("pending");
          setArtistsName(artist?.name);
          setArtistId(artist?.id);
        }}
      />
    </Stack>
  );
};

export default Images;
