import {Box, Img} from "@chakra-ui/react";
import { useState } from "react";
import {toast} from "react-toastify";
import Image from "next/image";

const Images = ({ video }) => {

  return (
      <Box w={"full"} h={[85 , 130 , 200]} overflow={"hidden"} position={"relative"}>
          <Image
              onError={(e : any) => {
                  return (e.target.src = "/brokenImage.png");
              }}
              style={{transition : ".5s"}}
              layout={"fill"}
              objectFit={"cover"}
              loading={"lazy"}
              placeholder={'blur'}
              blurDataURL={video.videoThumbnails[7].url}
              src={
                  video.videoThumbnails[0].url
              }
          />
      </Box>
  );
};

export default Images;
