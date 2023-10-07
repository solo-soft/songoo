import { HStack } from "@chakra-ui/react";
import Controller from "../../../../#General/Controller";
import Images from "../Images/Images";
import Name from "../../TopTracks/Tracks/Name/Name";
import Likes from "../../../../#General/Likes";
import Duration from "../../../../#General/Duration";
import { TActionsTypes } from "../../../TDashboard";
import { TSongs } from "../../../../TMainData";
import Albums from "../../TopTracks/Tracks/Albums/Albums";
import useSWR from "swr";

export type TPinnedTracks = {
  songs: TActionsTypes;
  songIndex: number;
  listOfSongs: Partial<TSongs["tracks"]>;
};
const Tracks = ({ songs, songIndex, listOfSongs }: TPinnedTracks) => {
  const { data: session } = useSWR("/api/getUserSession");
  return (
    <HStack role={"group"} w={"full"} rounded={10}>
      <HStack flex={3}>
        <Controller
          session={session}
          idsOfSongs={songs?.song_info.id}
          indexOfSongs={songIndex}
          arrayOfSongs={listOfSongs}
          flex={[1.2, 1.5, 0.8, 2]}
          iconSize={["lg", "2xl", "2xl", "lg"]}
          toRecently={true}
        />
        <Images songs={songs.song_info} />
        <Name value={songs.song_info} />
        <Albums album={songs?.song_info.album} />
        <HStack flex={[3, 3, 2, 5]} justify={"center"} align={"center"} spacing={5}>
          <Duration songs={songs.song_info} />
          <Likes songs={songs.song_info} />
        </HStack>
      </HStack>
    </HStack>
  );
};

export default Tracks;
