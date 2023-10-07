import { MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import useSWR from "swr";
import { TUserPlaylists } from "../../../Dashboard/TDashboard";
import getUserDataOnSupabase from "../../../../supabase/reads/getUserDataOnSupabase";
import usePlaylistAction from "../../../../hooks/usePlaylistAction";
import {TSongs} from "../TDotsMenu";
import CreatePlaylist from "./CreatePlaylist";
import {useId} from "react";

const PlaylistItems = ({ songs }: { songs: Partial<TSongs["tracks"][0]> | any}) => {
  const { data: session } = useSWR("/api/getUserSession");

  const id : string = useId()

  const {
    data: userPlaylists,
  }: { data: Array<TUserPlaylists> | undefined | null } = useSWR(
    "/supabase/reads/UserPlaylists",
    session.user ? () => getUserDataOnSupabase("UserPlaylists", session) : null
  );

  const { playlistAction } = usePlaylistAction();

  const handelAddToPlaylist = (playlists: TUserPlaylists) =>
    playlistAction(playlists, songs);

  return (
    <SubMenu disabled={!session.user}  overflow={"visible"} arrow={true} label="Add to playlist">
      <CreatePlaylist songs={songs} />
      <MenuDivider />
      {userPlaylists?.map((playlists) => {
        return (
          <MenuItem key={id} onClick={() => session.user ? handelAddToPlaylist(playlists) : null}>
            {playlists.title}
          </MenuItem>
        );
      })}
    </SubMenu>
  );
};

export default PlaylistItems;
