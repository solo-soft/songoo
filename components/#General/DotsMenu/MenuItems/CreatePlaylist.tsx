import {useSetRecoilState} from "recoil";
import {IS_OPEN_MODAL_CREATE_PLAYLIST, SELECTED_THE_SONG_BY_USER} from "../../../../recoil/atoms/atoms";
import {MenuItem} from "@szhsin/react-menu";
import {TUserPlaylists} from "../../../Dashboard/TDashboard";

const CreatePlaylist = ({songs}: { songs: TUserPlaylists | null } ) => {
    //?Specify open or closed state of the modal
    const setIsModalCreatePlaylist = useSetRecoilState(
        IS_OPEN_MODAL_CREATE_PLAYLIST
    );
    //?Send the selected data to the modal
    const setSelectedSongByUser = useSetRecoilState(SELECTED_THE_SONG_BY_USER);
    const handelCreatePlaylist = () => {
        setSelectedSongByUser(songs);
        setIsModalCreatePlaylist(true);
    };
    return (
        <MenuItem onClick={handelCreatePlaylist}>Create new playlist</MenuItem>
    );
};

export default CreatePlaylist;
