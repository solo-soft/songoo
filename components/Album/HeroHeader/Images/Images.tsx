import useSWR from "swr";
import { Box } from "@chakra-ui/react";
import Image from "next/image";

const Images = () => {
  const { data } = useSWR("query/schema/getAlbumsInfoById", null);

  return (
    <Box position={"relative"} p={150} rounded={35} overflow={"hidden"}>
      <Image
        src={data.albums.images[0].url}
        layout={"fill"}
        objectFit={"cover"}
        placeholder={"blur"}
        blurDataURL={data.albums.images?.[2].url}
      />
    </Box>
  );
};

export default Images;
