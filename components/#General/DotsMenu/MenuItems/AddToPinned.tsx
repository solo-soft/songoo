import {MenuItem} from "@szhsin/react-menu";
import usePinedAction from "../../../../hooks/usePinedAction";
import {TSongs} from "../../../TMainData";

const AddToPinned = ({songs} : { songs: Partial<TSongs["tracks"][0]> } ) => {

    const {pinnedAction} = usePinedAction()

    return (
        <MenuItem onClick={() => pinnedAction(songs)}>Add to pin</MenuItem>
    );
};

export default AddToPinned;
