import useSWR from "swr";
import Items from "./Items/Items";
import {Stack} from "@chakra-ui/react";

const Tracks = () => {

    const {data , error} = useSWR("query/schema/getAlbumsInfoById" , null)

    return (
        <Stack py={5}>
            {data.albums.tracks.items.map((track , index) => <Items key={track.id}  track={track} trackIndex={index}/>)}
        </Stack>
    );
};

export default Tracks;
