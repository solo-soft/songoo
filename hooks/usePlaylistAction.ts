import React from 'react';
import {TSongs} from "../components/TMainData";
import _ from "lodash";
import {toast} from "react-toastify";
import {mutate as globalMutate} from "swr/_internal";
import updateUserDataOnSupabase from "../supabase/update/updateUserDataOnSupabase";
import {TUserPlaylists} from "../components/Dashboard/TDashboard";
import useSWR from "swr";
import getUserDataOnSupabase from "../supabase/reads/getUserDataOnSupabase";

const usePlaylistAction = () => {

    const { data: session } = useSWR(
        "/api/getUserSession"
    );

    const { data: userPlaylists }: { data: Array<TUserPlaylists> | undefined | null} =
        useSWR("/supabase/reads/UserPlaylists", () =>
            getUserDataOnSupabase("UserPlaylists", session)
        );

    return {
        playlistAction : (playlists : any , songs : Partial<TSongs["tracks"][0]>) => {

            const foundItems = _.find(userPlaylists, ["id", playlists.id]);

            //?Checking the presence of the selected song in the current playlist
            const check = _.some(foundItems?.song_info, ["id", songs.id]);

            if (check) {
                toast.error(
                    `This song has already been added to the ${foundItems?.title} playlist`
                );
            } else {
                const updatePlaylist = [
                    ...playlists?.song_info,
                    {
                        album: songs.album,
                        artists: songs.artists,
                        duration_ms: songs.duration_ms,
                        id: songs.id,
                        name: songs.name,
                        preview_url: songs.preview_url,
                    },
                ];
                try {
                    toast.success(
                        `The song was added to the ${foundItems?.title} playlist`
                    );
                    return globalMutate(
                        "/supabase/reads/UserPlaylists",
                        updateUserDataOnSupabase(
                            "UserPlaylists",
                            updatePlaylist,
                            playlists.id
                        ),
                        {
                            rollbackOnError: true,
                            populateCache: false,
                        }
                    );
                } catch (e) {
                    toast.error(
                        `something went wrong in add to the ${foundItems?.title} playlist`
                    );
                }
            }
        }
    }
};

export default usePlaylistAction;
