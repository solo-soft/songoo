import { MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import useSWR from "swr";
import { TUserPlaylists } from "../../../Dashboard/TDashboard";
import getUserDataOnSupabase from "../../../../supabase/reads/getUserDataOnSupabase";
import usePlaylistAction from "../../../../hooks/usePlaylistAction";
import { TSongs } from "../../../TMainData";
import CreatePlaylist from "./CreatePlaylist";
import {useId} from "react";

const PlaylistItems = ({ songs }: { songs: Partial<TSongs["tracks"][0]> }) => {
  const { data: session } = useSWR("/api/getUserSession");

  const id : string = useId()

  const {
    data: userPlaylists,
  }: { data: Array<TUserPlaylists> | undefined | null } = useSWR(
    "/supabase/reads/UserPlaylists",
    () => getUserDataOnSupabase("UserPlaylists", session)
  );

  const { playlistAction } = usePlaylistAction();

  const handelAddToPlaylist = (playlists: TUserPlaylists) =>
    playlistAction(playlists, songs);

  return (
    <SubMenu overflow={"visible"} arrow={true} label="Add to playlist">
      <CreatePlaylist songs={songs} />
      <MenuDivider />
      {userPlaylists?.map((playlists) => {
        return (
          <MenuItem key={id} onClick={() => handelAddToPlaylist(playlists)}>
            {playlists.title}
          </MenuItem>
        );
      })}
    </SubMenu>
  );
};

export default PlaylistItems;
