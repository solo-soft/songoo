import useSWR from "swr";
import {Box, Stack} from "@chakra-ui/react";
import Header from "../Header/Header";
import HeroHeader from "./HeroHeader/HeroHeader";
import Tracks from "./Tracks/Tracks";
import Topics from "./Topics/Topics";

const Album = () => {


    const {data , error} = useSWR("query/schema/getAlbumsInfoById" , null)

    return (
        <Box h={"full"} overflow={"auto"}>
            <Header position={"relative"}/>
            <HeroHeader/>
            <Topics/>
            <Tracks/>
        </Box>
    );
};

export default Album;
