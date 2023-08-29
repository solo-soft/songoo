import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode} from "swiper";
import {Box, Button, HStack} from "@chakra-ui/react";
import useSWR from "swr";
import getUserDataOnSupabase from "../../../supabase/reads/getUserDataOnSupabase";
import Pictures from "./Pictures";
import Name from "./Name";
const Subscription = () => {

    const {data: session} = useSWR("/api/getUserSession")

    const {
        data: subscriptions,
        error
    } = useSWR("/supabase/reads/UserSubscriptions", () => getUserDataOnSupabase("UserSubscriptions" , session))

    return (
        <Swiper
            slidesPerView={7}
            spaceBetween={10}
            pagination={false}
            freeMode={true}
            modules={[FreeMode]}
            style={{width: "100%"}}
        >
            {
                subscriptions?.map((value) => {
                    return (
                        <SwiperSlide>
                            <Box key={value.id}
                                 w={195}
                                 h={195}
                                 flex={"0 0 auto"}
                                 rounded={10}
                                 overflow={"hidden"}
                                 position={"relative"}
                                 bg={"#252525"}
                                 cursor={"pointer"}
                            >

                                <Pictures
                                    value={value}/>

                                <HStack
                                    w={"full"}
                                    p={3}
                                    justifyContent={"space-between"}
                                    bg={"blackAlpha.800"}
                                    position={"absolute"}
                                    bottom={0}>

                                    <Name
                                        value={value}/>

                                    <Button size={"xs"}>
                                        See more
                                    </Button>
                                </HStack>

                            </Box>
                        </SwiperSlide>
                    )
                })
            }

        </Swiper>
    );
};

export default Subscription;
