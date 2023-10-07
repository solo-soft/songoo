import {HStack, useTheme, VStack} from "@chakra-ui/react";
import Header from "./Header";
import Playlists from "./Playlists";

const Feeling = () => {

    const {background: {section: {two: {primary}}}} = useTheme()


    return (
        <VStack bg={primary} p={5} width="full" height="100vh">
            <Header/>
            <HStack flex={1} w={"full"}>
                <Playlists/>
            </HStack>
        </VStack>
    );
};

export default Feeling;
