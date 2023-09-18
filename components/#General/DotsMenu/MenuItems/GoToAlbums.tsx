import {TSongs} from "../../../TMainData";
import {MenuItem} from "@szhsin/react-menu";
import {useRouter} from "next/router";

const GoToAlbums = ({songs} : { songs: Partial<TSongs["tracks"][0]> } ) => {
    const router = useRouter();
    return (
        songs?.album?.id ? (
            <MenuItem onClick={() => router.push(`/album/${songs?.album?.id}`)}>
                Go to album
            </MenuItem>
        ) : null
    );
};

export default GoToAlbums;
