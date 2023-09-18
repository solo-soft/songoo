import {TSongs} from "../../../TMainData";
import {MenuItem, SubMenu} from "@szhsin/react-menu";
import {useRouter} from "next/router";
import {useId} from "react";

const GoToArtist = ({songs} : { songs: Partial<TSongs["tracks"][0]> }) => {
    const router = useRouter();
    const id: string = useId()
    return (
        <SubMenu overflow={"visible"} arrow={true} label="Go to artist">
            {songs?.artists?.map((artist) => {
                return (
                    <MenuItem key={id} onClick={() => router.push(`/artist/${artist.id}`)}>
                        {artist.name}
                    </MenuItem>
                );
            })}
        </SubMenu>
    );
};

export default GoToArtist;
