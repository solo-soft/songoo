import {Box, Button, Grid, HStack, Text, VStack,} from "@chakra-ui/react";
import Image from "next/image";
import _ from "lodash";
import useSWR from "swr";
import {getSeveralArtistsForPickup} from "../graphQl/query/schema/getSeveralArtists";
import getUserSubscriptions from "../supabase/reads/getUserSubscriptions";
import setUserSubscriptions from "../supabase/inserts/setUserSubscriptions";
import {toast} from "react-toastify";
import deleteUserSubscriptions from "../supabase/delete/deleteUserSubscriptions";
import {v4 as uuidv4} from 'uuid';


export const Singers = () => {

    const {data: {GET_SEVERAL_ARTISTS_FOR_PICKUP: {artists}}} = useSWR("GET_SEVERAL_ARTISTS_FOR_PICKUP", () => getSeveralArtistsForPickup())


    const {data: session} = useSWR("/api/getUserSession")


    const {data, error, mutate} = useSWR("/supabase/reads/getUserSubscriptions", () => getUserSubscriptions(session) , {
        keepPreviousData : true
    })



    const handlerClick = async (value) => {

        const subscribed = _.find(data, {singer: {id: value.id}})


        if (subscribed) {

            //*Returns the new array of removed elements
            const unSubscribe = _.remove(data, (value) => value.id !== subscribed.id )


            try {

                await mutate(deleteUserSubscriptions(subscribed), {
                    optimisticData : [...unSubscribe],
                    populateCache : false,
                    rollbackOnError : true,
                    revalidate: true,
                })
                toast.success("Successfully remove the item.");
            } catch (e) {
                console.log(e)
                toast.error("Failed to remove the item.");
            }
        }
        else {
            const singerInfo = {
                id : uuidv4() ,
                userId: session.user.id,
                email : session.user.email,
                created_at : new Date(),
                singer: value
            }

            try {
                await mutate(setUserSubscriptions(session, singerInfo), {
                    optimisticData: [...data, singerInfo],
                    populateCache: false,
                    rollbackOnError: true,
                    revalidate: false,
                })
                toast.success("Successfully added the new item.");
            } catch (e) {
                console.log(e)
                toast.error("Failed to add the new item.");
            }
        }
    }

    // console.log(data)

    return (
        <VStack justifyContent={"center"} h={"100vh"} m={"auto"} position={"relative"}>

            <VStack h={"32rem"} overflow={"auto"} spacing={5}>


                <Grid gap={3} templateColumns={"repeat(4 , 1fr)"}>

                    {
                        _.sortBy(artists, 'name')?.map((artistsInfo) => {

                            const checkSubscriptions : Boolean = _.some(data, {singer: {id: artistsInfo.id}})

                            return (
                                <Box key={artistsInfo.id} w={250} h={250} position={"relative"} rounded={20} overflow={"hidden"}>
                                    <Image
                                        layout={"fill"}
                                        objectFit={"cover"}
                                        loading={"lazy"}
                                        placeholder={"blur"}
                                        blurDataURL={artistsInfo.images[2].url}
                                        src={artistsInfo.images[0].url}
                                    />

                                    <HStack w={"full"} justifyContent={"space-between"} bottom={0} position={"absolute"}
                                            bg={"blackAlpha.600"} p={3}>
                                        <Text fontSize={"lg"} noOfLines={1}
                                              fontWeight={"bold"}>{artistsInfo.name}</Text>
                                        <Button
                                            variant={"solid"}
                                                colorScheme={checkSubscriptions ? "pink" : "gray"}
                                                onClick={() => handlerClick(artistsInfo)} size={"sm"}>{checkSubscriptions ? "Subscribed" : "Subscribe"}</Button>
                                    </HStack>
                                </Box>
                            )
                        })
                    }

                </Grid>


            </VStack>

        </VStack>
    );
};
