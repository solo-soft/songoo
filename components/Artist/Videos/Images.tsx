import { Img } from "@chakra-ui/react";
import { useState } from "react";
import {toast} from "react-toastify";

const Images = ({ video }) => {
  const [thumbnails, setThumbnails] = useState<string | null>(null);

  return (
    <Img
      onMouseOver={() => setThumbnails(video?.videoId)}
      onMouseLeave={() => setThumbnails(null)}
      onError={(e) => {
        return (e.target.src = "/brokenImage.png");
      }}
      w={"100%"}
      h={200}
      cursor={"pointer"}
      objectFit={"cover"}
      src={
        thumbnails === video?.videoId
          ? video?.movingThumbnails?.[0]?.url || video?.thumbnails?.[1]?.url
          : video?.thumbnails?.[1]?.url || video?.thumbnails?.[0]?.url
      }
    />
  );
};

export default Images;
