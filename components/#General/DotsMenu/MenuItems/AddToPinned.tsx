import {MenuItem} from "@szhsin/react-menu";
import usePinedAction from "../../../../hooks/usePinedAction";
import {TSongs} from "../TDotsMenu";
import useSWR from "swr";

const AddToPinned = ({songs} : { songs: Partial<TSongs["tracks"][0]> } ) => {
    const { data: session } = useSWR("/api/getUserSession");

    const {pinnedAction} = usePinedAction()

    return (
        <MenuItem disabled={!session.user} onClick={() => session ?  pinnedAction(songs) : null}>Add to pin</MenuItem>
    );
};

export default AddToPinned;
