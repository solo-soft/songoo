import  {useRef} from 'react';
import {Box, HStack, Text, VStack} from "@chakra-ui/react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Grid, Navigation} from "swiper";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from "next/image";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {useRouter} from "next/router";
import {useSwiper} from "swiper/react";
import MySwiperControls from "./MySwiperControls";
import {createRef} from "react";





const Fans = ({getRelatedArtist}) => {

    const {push} = useRouter()

    const swiperRef = useRef(null);



    return (
        <VStack w={"full"} align={'flex-start'} zIndex={1000}>


            <HStack w={"full"} justify={"space-between"}>
                <Text  align={'left'} fontSize={45} fontWeight={"bold"} color={"whiteAlpha.700"} my={5}>Fans also like</Text>
                <MySwiperControls
                    onPrev={() => swiperRef.current.slidePrev()}
                    onNext={() => swiperRef.current.slideNext()}/>
            </HStack>

            <HStack w={'full'} height={500} position={"relative"}>
                <Swiper
                    ref={swiperRef}
                    breakpointsBase={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Grid  , Navigation]}
                    style={{width : '100%' , height : 500 , position : 'absolute'}}
                    breakpoints={{
                        640 : {
                            slidesPerView : 3,
                            spaceBetween : 2,
                            grid : {
                                rows : 2
                            }
                        },
                        1200 : {
                            slidesPerView : 5,
                            spaceBetween : 3,
                            grid : {
                                rows : 2
                            }
                        },
                        1920 : {
                            slidesPerView : 7,
                            spaceBetween : 0,
                            grid : {
                                rows : 2
                            }
                        }
                    }}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}>

                    {
                        getRelatedArtist.artists.map(related => (
                            <SwiperSlide  key={related.id} style={{height : 235}}>
                                <VStack >
                                    <Box onClick={() => push(`/artist/${related.id}`)}  bg={"whiteAlpha.200"} boxShadow={'dark-lg'} position={"relative"} width={190} height={190} rounded={"full"} overflow={"hidden"}>
                                        <Image src={related.images[0].url} loading={"lazy"} placeholder={"blur"} blurDataURL={related.images[2].url} layout={"fill"} objectFit={"cover"} style={{position : "absolute"}}/>
                                    </Box>
                                    <Text bg={"whiteAlpha.200"} rounded={5} p={1} fontSize={12} noOfLines={1} color={'whitesmoke'}>{related.name}</Text>
                                </VStack>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </HStack>
        </VStack>
    );
};

export default Fans;
