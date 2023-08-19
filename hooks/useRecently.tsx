import React, { useContext } from "react";
import useSWR, { mutate } from "swr";
import setUserDataOnSupabase from "../supabase/inserts/setUserDataOnSupabase";
import {RecentlyPlayedContext} from "../components/RecentlyProvider";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const useRecently = () => {
  const { data: session } = useSWR("/api/getUserSession");
  const recentlyPlayed = useContext(RecentlyPlayedContext);

  return {
    addToRecentlyPlayed: (currentSelectedSong) => {
      const existInRecentlyPlayed = _.some(recentlyPlayed, {
        recently_played: { id: currentSelectedSong.id },
      });

      const songInfo = {
        id: uuidv4(),
        userId: session.user.id,
        recently_played: currentSelectedSong,
        created_at: new Date(),
      };

      if (!existInRecentlyPlayed) {
        return mutate(
          "/supabase/reads/UserRecentlyPlayed",
          setUserDataOnSupabase("UserRecentlyPlayed", songInfo),
          {
            optimisticData: recentlyPlayed && [...recentlyPlayed, songInfo],
            rollbackOnError: true,
            populateCache: false,
            revalidate: true,
          }
        );
      }
      return null;
    },
  };
};

export default useRecently;
