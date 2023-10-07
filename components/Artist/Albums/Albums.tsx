import { Stack } from "@chakra-ui/react";
import Slider from "../Sliders/Slider";
import { SwiperSlide } from "swiper/react";
import Title from "../Common/Title";
import Images from "./Images/Images";
import { swiperAlbumsSliderBreakPoint } from "../swiperResponsive";
import { useRouter } from "next/router";
import { TAlbums } from "../TArist";

const Albums = ({ albums }: { albums: TAlbums | undefined }) => {
  const router = useRouter();

  return (
    <Stack py={[1, 1, 5]} w={"full"} position={"relative"}>
      <Title cause={"Albums"} />
      <Slider
        preview={7}
        breakpoint={swiperAlbumsSliderBreakPoint}
      >
        {albums?.items?.map((items) => {
          const props = { items };
          return (
            <SwiperSlide key={items.id} onClick={() => router.push(`/album/${items?.id}`)}>
              <Images {...props} />
            </SwiperSlide>
          );
        })}
      </Slider>
    </Stack>
  );
};

export default Albums;
