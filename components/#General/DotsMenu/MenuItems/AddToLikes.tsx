import { MenuItem } from "@szhsin/react-menu";
import { useRouter } from "next/router";
import useLikesAction from "../../../../hooks/useLikesAction";
import { TSongs } from "../../../TMainData";

const AddToLikes = ({ songs }: { songs: Partial<TSongs["tracks"][0]> }) => {
  const router = useRouter();

  const { likeAction } = useLikesAction();
  const handelAddToLiked = () => likeAction(songs);

  return router.query.slug !== "likes" ? (
    <MenuItem onClick={handelAddToLiked}>Save to your Liked song</MenuItem>
  ) : null;
};

export default AddToLikes;
