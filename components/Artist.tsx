import {Box, HStack, Input, Select, Stack, Text, VStack} from "@chakra-ui/react";
import Image from "next/image";
import {singersUS , singersIR} from "../utils/randomBestArtists";
import {ARTISTS_NAME} from "../recoil/atoms/atoms";
import {useSetRecoilState} from "recoil";
import {ChangeEvent} from "react";


type artist = {
    __typename: "suggestion"
    id: string
    images: [{
        url: string
    }]
    name: string
    popularity: number
}

export default function Artist({artist}: { artist: artist }) {

    const {id, name, images} : {
        id: string
        name: string
        images: [{ url: string }]
    } = artist

    const setArtistsName = useSetRecoilState(ARTISTS_NAME)

    return (
        <Stack spacing={3} h={450}>


            <Select placeholder='Select from 100 artists' bg={"#252525"} border={"none"} rounded={40} onChange={({target} : {target : HTMLSelectElement}) => setArtistsName(target.value)}>
                {
                    singersIR.map(name => <option key={Math.random()} value={name}>{name}</option>)
                }
            </Select>


                    <VStack spacing={0} justifyContent={"center"} w={"full"} p={1} rounded={15} bg={"#252525"}>
                        <Text fontSize={"md"} fontWeight={"light"}>It is suggested to you</Text>
                        <Text fontSize={"xl"} fontWeight={"bold"}>{name}</Text>
                    </VStack>

                    <Box w={330} h={330} rounded={40} overflow={"hidden"} position={"relative"}>
                        <Image layout={"fill"} objectFit={"cover"} alt={name} src={images[0]?.url}/>
                    </Box>

        </Stack>
    )
}
