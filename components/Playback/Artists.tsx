import {Text} from "@chakra-ui/react";
import {useRecoilValue} from "recoil";
import {PLAYBACK_INFORMATION} from "../../recoil/atoms/atoms";
import {useRouter} from "next/router";

type TArtists = {
    id : string
    name : string
}

const Artists = () => {
    const { indexOfSongs, arrayOfSongs } = useRecoilValue(PLAYBACK_INFORMATION);
    const {artists} = arrayOfSongs[indexOfSongs] ?? {};

    const router = useRouter()

    return (
        <Text noOfLines={1} fontSize={"2xs"}>
            {artists?.map((value : TArtists) => (<Text onClick={()=> router.push(`/artist/${value.id}`)}>{value.name}</Text>))}
        </Text>
    );
};

export default Artists;
