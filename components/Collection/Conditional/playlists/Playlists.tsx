import {Box, HStack, Stack} from "@chakra-ui/react";
import Title from "./Title";
import Images from "./Images";
import {useRouter} from "next/router";


const Playlists = ({ collection , property }) => {

    const router = useRouter()
    const props = {collection , property}

    return (
        <HStack justify={"space-between"} p={25} rounded={15} cursor={"pointer"} bg={"#7885ff"} onClick={() =>router.push(`/collection/playlists/${collection.id}`)}>
            <Title {...props}/>
            <Images {...props}/>
        </HStack>
    );
};

export default Playlists;
