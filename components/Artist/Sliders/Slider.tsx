import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode} from "swiper";
import {Box, Button, HStack} from "@chakra-ui/react";
import {ReactNode} from "react";

type TSlider = {
    children : ReactNode
    height? : number | string,
    breakpoint? : {}
    preview ?: number
}

const Slider = ({children , height , preview , breakpoint} : TSlider ) => {
    return (
        <Box zIndex={1000}>
            <Swiper
                breakpoints={breakpoint}
                slidesPerView={preview}
                spaceBetween={10}
                pagination={false}
                freeMode={true}
                modules={[FreeMode]}
                style={{width: "100%"}}
            >
                {children}
            </Swiper>
        </Box>
    );
};

export default Slider;
