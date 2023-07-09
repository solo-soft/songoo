import {Badge, Box, Grid, GridItem, HStack, Stack, Text, VStack} from "@chakra-ui/react";
import Image from "next/image";

type tracks = {
    tracks: [{
        id: string
        name: string
        duration_ms: number
        preview_url: null | string
        album: {
            id: string
            images: [{
                url: string
            }]
            name: string

        }
    }]
}

type songs = {
    __typename: 'suggestion',
} & tracks

const Tracks = ({songs}: { songs: songs }) => {

    const {tracks}: tracks = songs


    const render = tracks.slice(0, 8).map(value => {
        return (
            <GridItem key={value.id} w={160} h={160} position={"relative"} rounded={5} bg='green.900'>
                <Image layout={"fill"} objectFit={"cover"} alt={value.name} src={value.album.images[0].url}/>
            </GridItem>
        )
    })

    return (
        <Stack spacing={3}>
            <HStack>
                <Box py={2} px={4} fontSize={"sm"} rounded={40} bg={"#252525"}>Taylor swift</Box>
                <Box py={2} px={4} fontSize={"sm"} rounded={40} bg={"#252525"}>Imagen dragons</Box>
            </HStack>
            <HStack height={400} p={25} bg={"#252525"} rounded={25}>
                <Grid templateColumns='repeat(4, 1fr)' templateRows='repeat(2, 1fr)' gap={2}>
                    {render}
                </Grid>
            </HStack>
        </Stack>
    );
};

export default Tracks;
