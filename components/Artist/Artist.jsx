import {Stack} from "@chakra-ui/react";
import useSWR from "swr";
import Tracks from "./Tracks/Tracks";
import Albums from "./Albums/Albums";
import Related from "./Related";

import HeroHeader from "./HeroHeader";
import Videos from "./Videos/Videos";

export const Artist = () => {

    const {data : {artist , songs , albums , related}} = useSWR("/graphQl/query/schema/getArtistInfoById");

    const props = {artist , songs , albums , related}


    return (
        <Stack >

            <HeroHeader {...props}/>

            <Tracks {...props} />

            <Albums {...props}/>

            <Videos {...props}/>

            <Related {...props}/>

        </Stack>
    );
};
