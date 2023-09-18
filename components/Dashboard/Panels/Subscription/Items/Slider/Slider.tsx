import { FreeMode } from "swiper";
import { Swiper } from "swiper/react";

const Slider = ({ children }: { children?: JSX.Element[] }) => {
  return (
    <Swiper
      spaceBetween={10}
      pagination={false}
      freeMode={true}
      modules={[FreeMode]}
      style={{ width: "100%" }}
      breakpoints={{
        340: {
          slidesPerView: 3,
        },
        520: {
          slidesPerView: 3,
        },
        640: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        992: {
          slidesPerView: 5,
        },
        1280: {
          slidesPerView: 7,
        },
        1780: {
          slidesPerView: 9,
        },
      }}
    >
      {children}
    </Swiper>
  );
};

export default Slider;
