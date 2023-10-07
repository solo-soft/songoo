import React, {useState} from 'react';
import useSWR from "swr";
import getFeelPlaylist from "../../graphQl/query/schema/getFeelPlaylist";
import {Box, HStack, Text, VStack} from "@chakra-ui/react";
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import {EffectCoverflow, Pagination , FreeMode} from 'swiper'
import {useRecoilValue} from "recoil";
import {FEELS} from "../../recoil/atoms/atoms";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


const Playlists = () => {


    const feels = useRecoilValue(FEELS)

    const [active , setActive] = useState(0)


    const {data} = useSWR(["/Query/Feel/GetFeelingPlaylist" , feels], ([_ , feels]) => getFeelPlaylist(feels) , {
        keepPreviousData : true
    })


    return (
        <VStack m={"auto"} spacing={0}>

            <Text w={550} textAlign={"center"} fontSize={"4xl"} fontWeight={"bold"} noOfLines={1}>{data?.feels?.playlists?.items[active].name}</Text>

            <Swiper
                onSlideChange={(e) => setActive(e.activeIndex)}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={false}
                initialSlide={1}
                modules={[EffectCoverflow, Pagination , FreeMode]}
                style={{width: "1100px", padding : "2rem"}}

            >
                {
                    data?.feels.playlists?.items.filter(value => value.owner.display_name === "Spotify").map(value => {
                        return (
                            <SwiperSlide key={value.id} style={{width : "350px" , height : "350px"}}>
                                <Box>
                                    <Box rounded={5} bg={"#252525"} w={350} h={350} bgColor={"#252525"} position={"relative"}
                                         overflow={"hidden"}>
                                        <Image layout={"fill"} objectFit={"cover"} placeholder={"blur"}
                                               blurDataURL={value.images[0]?.url} loading={"lazy"}
                                               src={value.images[0]?.url}/>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                        )
                    })
                }

            </Swiper>


        </VStack>
    );
};

export default Playlists;
