import useSWR from "swr";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import {TSpecificAlbums} from "../../TAlbum";

const Images = ({albumInfo} : { albumInfo: TSpecificAlbums | undefined }) => {


  return (
    <Box position={"relative"} w={["full" , "full" , 620]} h={[280 , 280 , 340]} opacity={"30%"} rounded={[10 , 10 , 15]} overflow={"hidden"}>
      <Image
        style={{transition : ".5s"}}
        src={albumInfo?.albums?.images?.[0].url || "/"}
        layout={"fill"}
        objectFit={"cover"}
        placeholder={"blur"}
        blurDataURL={albumInfo?.albums?.images?.[2].url || "/"}
      />
    </Box>
  );
};

export default Images;
