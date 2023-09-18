import useSWR from "swr";
import Items from "./Items/Items";
import {Stack} from "@chakra-ui/react";

const Tracks = () => {

    const {data , error} = useSWR("query/schema/getAlbumsInfoById" , null)

    //?Push image in this array
    const controllerData = data.albums.tracks.items.map(value => ({...value , album : { ...value.album , images : data.albums.images }}))

    return (
        <Stack spacing={8}>
            {controllerData.map((track , index) => <Items key={track.id}  track={track} trackIndex={index}/>)}
        </Stack>
    );
};

export default Tracks;
