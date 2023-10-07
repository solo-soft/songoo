import React, { useContext } from "react";
import useSWR, { mutate } from "swr";
import setUserDataOnSupabase from "../supabase/inserts/setUserDataOnSupabase";
import { RecentlyPlayedContext } from "../provider/RecentlyProvider";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import {TSongs} from "../components/TMainData";

const useRecently = () => {
  const { data: session } = useSWR("/api/getUserSession");

  const recentlyPlayed = useContext(RecentlyPlayedContext);

  return {
    addToRecentlyPlayed: (currentSelectedSong : TSongs["tracks"][0]) => {

      if (session.user) {
        const existInRecentlyPlayed = _.some(recentlyPlayed, {
          song_info: { id: currentSelectedSong.id },
        });

        const songInfo = {
          id: uuidv4(),
          userId: session.user.id,
          song_info: currentSelectedSong,
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
      }


      return null;
    },
  };
};

export default useRecently;
