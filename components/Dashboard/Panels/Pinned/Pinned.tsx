import {Divider, Icon, Stack, Text, VStack} from "@chakra-ui/react";
import _ from "lodash";
import { useContext } from "react";
import { PinnedContext } from "../../../../provider/PinnedProvider";
import Title from "./Title/Title";
import Tracks from "./Tracks/Tracks";
import { TActionsTypes, TPinned } from "../../TDashboard";
import { FaList } from "react-icons/fa";
import {AiFillPushpin} from "react-icons/ai";

const Pinned = () => {
  const pinnedSongs: TPinned[] | undefined | null = useContext(
    PinnedContext
  );

  const sortData = _.sortBy(
    pinnedSongs,
    (items) => -new Date(items.created_at)
  );
  const listOfSongs = _.flatMap(sortData, "song_info");

  return (
    <>
      <Title />
      <Divider />
      {listOfSongs.length ? (
        <Stack spacing={3} overflow={"auto"}>
          {sortData.map((songs: TActionsTypes, songIndex: number) => {
            const props = { songs, songIndex, listOfSongs };
            return <Tracks key={songs.id} {...props} />;
          })}
        </Stack>
      ) : (
        <VStack h={"100vh"} justify={"center"}>
          <Icon as={AiFillPushpin} fontSize={"7xl"} />
          <Text fontSize={"sm"}>Add best of your tracks 🎵</Text>
        </VStack>
      )}
    </>
  );
};

export default Pinned;
