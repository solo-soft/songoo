import { Stack } from "@chakra-ui/react";
import Image from "next/image";

type TImages = {
  id: string;
  images: Array<{
    url: string;
  }>;
  name: string;
};
const Images = ({ picture }: { picture: TImages | undefined }) => {
  return (
    <Stack
      position={"relative"}
      p={[6, 8, 8 , 6 , 8]}
      rounded={5}
      overflow={"hidden"}
      bg={"#252525"}
    >
      <Image
        src={picture?.images[0].url || "/"}
        placeholder={"blur"}
        blurDataURL={picture?.images[2].url || "/"}
        objectFit={"cover"}
        layout={"fill"}
      />
    </Stack>
  );
};

export default Images;
