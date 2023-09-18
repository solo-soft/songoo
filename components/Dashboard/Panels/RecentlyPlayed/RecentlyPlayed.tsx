import { useContext } from "react";
import {
  Divider,
  Grid,
  Stack,
} from "@chakra-ui/react";
import { RecentlyPlayedContext } from "../../../../provider/RecentlyProvider";
import _ from "lodash";
import Title from "./Title/Title";
import Images from "./Images/Images";
import Names from "./Names/Names";
import {TRecentlyPlayed} from "./TRecentlyPlayed";

const RecentlyPlayed = () => {
  const recentlyPlayed: TRecentlyPlayed[] | undefined | null= useContext(
    RecentlyPlayedContext
  );

  const sortedData = _.sortBy(
    recentlyPlayed,
    (items) => -new Date(items.created_at)
  );

  const listOfSongs = _.flatMap(sortedData, "song_info");

  return (
    <Stack>
      <Title />
      <Divider />

      <Grid
        gap={1}
        templateColumns={{
          sm: "repeat(3 , 1fr)",
          lg: "repeat(1 , 1fr)",
          xl: "repeat(2 , 1fr)",
          "2xl": "repeat(3 , 1fr)",
        }}
      >
        {sortedData
          ?.slice(0, 6)
          .map((songs: TRecentlyPlayed, songsIndex: number) => {
            const {
              song_info,
            }: { song_info: Partial<TRecentlyPlayed["song_info"]> } = songs;

            const props = { song_info, songsIndex, listOfSongs };

            return (
              <Stack
                key={song_info.id}
                direction={["column", "column", "column", "row"]}
                align={"center"}
                role={"group"}
                rounded={[5, 5, 5, 5, 10]}
                overflow={"hidden"}
                bg={"#252525"}
                spacing={{ sm: 0, lg: 2 }}
              >
                <Images {...props} />
                <Names {...props} />
              </Stack>
            );
          })}
      </Grid>
    </Stack>
  );
};

export default RecentlyPlayed;
