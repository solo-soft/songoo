import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode} from "swiper";
import {Box, Button, HStack} from "@chakra-ui/react";
import Images from "../../Dashboard/Panels/Subscription/Items/Images/Images";
import Name from "../../Dashboard/Panels/Subscription/Items/Name/Name";


const Slider = ({children , height , preview , breakpoint = {}}) => {
    return (
        <Box h={height} zIndex={1000}>
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
