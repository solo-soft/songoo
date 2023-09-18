import {
    Divider, Stack,
    VStack,
} from "@chakra-ui/react";
import _ from "lodash";
import { useContext } from "react";
import { PinnedContext } from "../../../../provider/PinnedProvider";
import Title from "./Title/Title";
import Tracks from "./Tracks/Tracks";
import {TActionsTypes, TPinned} from "../../TDashboard";

const Pinned = () => {
  const pinnedSongs : TPinned[] | undefined = useContext<TPinned[] | undefined>(PinnedContext);

  const sortData = _.sortBy(
    pinnedSongs,
    (items) => -new Date(items.created_at)
  );
  const listOfSongs = _.flatMap(sortData, "song_info");

  return (
    <>
      <Title />
      <Divider />
      <Stack spacing={3} overflow={"auto"}>
        {sortData.map((songs : TActionsTypes, songIndex : number) => {
            const props = {songs , songIndex , listOfSongs}
            return <Tracks key={songs.id} {...props }/>
        })}
      </Stack>
    </>
  );
};

export default Pinned;
