import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import deleteUserSubscriptions from "../supabase/delete/deleteUserSubscriptions";
import setUserDataOnSupabase from "../supabase/inserts/setUserDataOnSupabase";
import useSWR from "swr";
import getUserDataOnSupabase from "../supabase/reads/getUserDataOnSupabase";
import { TSongs } from "../components/TMainData";
import useFetchSwr from "./useFetchSwr";

type TLikeAction = {
  id: string;
  userId: string;
  create_by: string;
  song_info: Partial<TSongs["tracks"]>;
  created_at: string;
};

const useLikesAction = () => {
  const { swrFetcher } = useFetchSwr();

  const { data: session } = useSWR("/api/getUserSession");
  const {
    data: userLikedSong,
    mutate,
  }: { data: TLikeAction[] | undefined | null; mutate: Function } = swrFetcher<
    TLikeAction[] | undefined | null
  >(
    "/supabase/reads/UserLikedSong",
    () => getUserDataOnSupabase("UserLikedSong", session),
    {
      keepPreviousData: true,
    }
  );


  return {
    likeAction: (songs: Partial<TSongs["tracks"][0]>) => {
      const likedSong = _.find(userLikedSong, { song_info: { id: songs.id } });

      const songInfo = {
        id: uuidv4(),
        userId: session?.user.id,
        create_by: session?.user.email,
        song_info: songs,
        created_at: new Date(),
      };

      if (likedSong && userLikedSong) {
        //*Returns the new array of removed elements
        const unLikedSong = _.remove(
          userLikedSong,
          (value) => value.id !== likedSong.id
        );

        return mutate(deleteUserSubscriptions("UserLikedSong", likedSong.id), {
          optimisticData: [...unLikedSong],
          revalidate: true,
          rollbackOnError: true,
          populateCache: false,
        });
      } else {
        return mutate(setUserDataOnSupabase("UserLikedSong", songInfo), {
          optimisticData: userLikedSong && [...userLikedSong, songInfo],
          revalidate: true,
          rollbackOnError: true,
          populateCache: false,
        });
      }
    },
  };
};

export default useLikesAction;
