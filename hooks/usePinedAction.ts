import React, {useContext} from 'react';
import {v4 as uuidv4} from "uuid";
import {mutate as globalMutate} from "swr/_internal";
import setUserDataOnSupabase from "../supabase/inserts/setUserDataOnSupabase";
import useSWR from "swr";
import {TSongs} from "../components/TMainData";
import {PinnedContext} from "../provider/PinnedProvider";
import {TPinned} from "../components/Dashboard/TDashboard";
import {useToast} from "@chakra-ui/react";

const usePinedAction = () => {
    const toast = useToast()
    const { data: session } = useSWR(
        "/api/getUserSession"
    );
    const pinnedSongs = useContext<TPinned[] | undefined | null>(PinnedContext);

    return {
        pinnedAction : (songs :  Partial<TSongs["tracks"][0]>) => {
            const songInfo = {
                id: uuidv4(),
                userId: session?.user.id,
                created_by: session?.user.email,
                created_at: new Date(),
                song_info: {
                    id: songs.id,
                    name: songs.name,
                    preview_url: songs.preview_url,
                    duration_ms: songs.duration_ms,
                    album: songs.album,
                    artists: songs.artists,
                },
            };
            toast({
                title : "Add to Pinned",
                status : "info",
                position : "bottom-left"
            })
            return globalMutate(
                "/supabase/reads/UserPinned",
                session.user ? setUserDataOnSupabase("UserPinned", songInfo) : null,
                {
                    optimisticData: pinnedSongs && [...pinnedSongs, songInfo],
                    revalidate: true,
                    rollbackOnError: true,
                    populateCache: false,
                }
            );
        }
    };
};

export default usePinedAction;
