import {Box, Button, HStack, Input, Select, Skeleton, Spinner, Stack, Text, VStack} from "@chakra-ui/react";
import Image from "next/image";
import {singersUS, singersIR} from "../../utils/randomBestArtists";
import {ARTISTS_NAME} from "../../recoil/atoms/atoms";
import {useSetRecoilState, useRecoilState} from "recoil";
import {ChangeEvent, useState} from "react";
import {STATUS} from "../../recoil/atoms/atoms";
import {useTheme} from "@chakra-ui/react";



type artist = {
    __typename: "suggestion"
    id: string
    images: [{
        url: string
    }] | any
    name: string
    popularity: number
}

export default function Artist({artist}: { artist: artist }) {

    const {background: {section: {one: {secondary}}}, default: {color}} = useTheme()

    const [artistName, setArtistsName] = useRecoilState<string | undefined>(ARTISTS_NAME)
    const [status, setStatus] = useRecoilState<string | undefined>(STATUS)
    const [openCollapse, setOpenCollapse] = useState<boolean>(false)


    const handelChange = (target: any) => {

        setArtistsName(target)
        setOpenCollapse(prevState => !prevState)
        setStatus("pending")

    }


    return (
        <Stack spacing={3} h={450}>

            <Button onClick={() => setOpenCollapse(prevState => !prevState)}>Select from 100 artists</Button>


            {
                openCollapse &&
                <Stack position={"relative"}>
                    <Stack bg={"red"} position={"absolute"} zIndex={1} w={"full"} height={400} overflow={"auto"}>
                        {
                            singersUS.map(name => <Text onClick={(event) => handelChange(event.target.innerText)}
                                                        key={Math.random()}>{name}</Text>)
                        }
                    </Stack>
                </Stack>
            }


            <VStack spacing={0} justifyContent={"center"} w={"full"} p={2} rounded={15}
                    bg={status === "pending" ? color : secondary}>
                <Text fontSize={"md"} fontWeight={"light"}>It is suggested to you</Text>

                {
                    status === "pending" ? <HStack>
                            <Spinner
                                thickness='3px'
                                speed='0.65s'
                                size='md'
                            />
                            <Text fontSize={"xl"} fontWeight={"bold"}>Wait for {artistName}</Text>
                        </HStack>
                        :
                        <Text fontSize={"xl"} fontWeight={"bold"}>{artist?.name}</Text>
                }
            </VStack>

            <Stack w={330} h={330} rounded={40} overflow={"hidden"} position={"relative"} bg={"whiteAlpha.50"}>
                <Image sizes={"(max-width: 230px)"}
                       layout={"fill"}
                       objectFit={"cover"}
                       placeholder={"blur"}
                       blurDataURL={artist?.images?.[2]?.url}
                       alt={artist?.name}
                       src={artist?.images?.[0]?.url}/>
            </Stack>


        </Stack>
    )
}
