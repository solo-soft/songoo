import { Icon } from "@chakra-ui/react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import useSWR from "swr";
import getUserDataOnSupabase from "../../supabase/reads/getUserDataOnSupabase";
import _ from "lodash";
import useLikesAction from "../../hooks/useLikesAction";
import { TSongs } from "../TMainData";

const Likes = ({ songs }: { songs: Partial<TSongs["tracks"][0]> }) => {
  const { data: session } = useSWR("/api/getUserSession");

  const { likeAction } = useLikesAction();

  const { data: userLikedSong, mutate } = useSWR(
    "/supabase/reads/UserLikedSong",
    session.user ? () => getUserDataOnSupabase("UserLikedSong", session) : null
  );

  const likedSong = _.find(userLikedSong, { song_info: { id: songs?.id } });
  const handelAddToLiked = () => (session.user ? likeAction(songs) : null);

  return session.user ? (
    <Icon
      onClick={handelAddToLiked}
      fontSize={["xs", "sm", "lg", "xs", "sm"]}
      color={"#7885FF"}
      as={likedSong ? BsHeartFill : BsHeart}
    />
  ) : null;
};

export default Likes;
