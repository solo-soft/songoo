import { MenuItem } from "@szhsin/react-menu";
import { useRouter } from "next/router";
import useLikesAction from "../../../../hooks/useLikesAction";
import { TSongs } from "../../../TMainData";
import useSWR from "swr";

const AddToLikes = ({ songs }: { songs: Partial<TSongs["tracks"][0]> }) => {
  const router = useRouter();

  const { data: session } = useSWR("/api/getUserSession");

  const { likeAction } = useLikesAction();
  const handelAddToLiked = () => session.user ? likeAction(songs) : null;

  return router.query.slug !== "likes" ? (
    <MenuItem disabled={!session.user} onClick={handelAddToLiked}>Save to your Liked song</MenuItem>
  ) : null;
};

export default AddToLikes;
