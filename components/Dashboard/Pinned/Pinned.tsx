import {Box, Divider, Grid, HStack, Icon, Stack, Text, VStack} from "@chakra-ui/react";
import React from "react";
import {TSession} from "../../Type";
import useSWR from "swr";
import getUserDataOnSupabase from "../../../supabase/reads/getUserDataOnSupabase";
import Image from "next/image";
import _ from "lodash"
import Controller from "../TopTenTracks/Tracks/Controller";
import Name from "../TopTenTracks/Tracks/Name";

const Pinned = () => {

    const {data: session} : {data : TSession | undefined} = useSWR("/api/getUserSession")

    const {data: userPinned}  = useSWR("/supabase/reads/UserPinned", () => getUserDataOnSupabase("UserPinned", session))

    const listOfSongs = _.flatMap(userPinned , "song_info")

    return (
        <>
            <Text fontWeight={"light"} fontSize={25}>Pinned</Text>
            <Divider/>
            <VStack w={"full"} overflow={"auto"}>
                {
                    userPinned?.map((info , currentIndexId) => {
                        return (
                            <HStack
                                _hover={{ bg: "blackAlpha.300" }}
                                role={"group"}
                                w={"full"}
                                p={2}
                                rounded={10}
                                key={info.id}>

                                <Controller
                                    idsOfSongs={info?.song_info.id}
                                    indexOfSongs={currentIndexId}
                                    arrayOfSongs={listOfSongs}
                                    flex={1.4}
                                />

                                <HStack flex={12}>
                                    <Box w={45} h={45} position={"relative"} rounded={10}  overflow={"hidden"}>
                                        <Image src={info.song_info.album.images[1].url} layout={"fill"} objectFit={"cover"}/>
                                    </Box>
                                    <Name value={info.song_info} />
                                </HStack>

                            </HStack>
                        )
                    })
                }
            </VStack>
        </>
    );
};

export default Pinned;
