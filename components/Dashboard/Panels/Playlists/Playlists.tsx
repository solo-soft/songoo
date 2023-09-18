import { Box, Grid } from "@chakra-ui/react";
import useSWR from "swr";
import getUserDataOnSupabase from "../../../../supabase/reads/getUserDataOnSupabase";
import {TPlaylists} from "./TPlaylists";
import _ from "lodash";
import Title from "./Title/Title";
import Images from "./Images/Images";
import Names from "./Names/Names";
import useFetchSwr from "../../../../hooks/useFetchSwr";

const Playlists = () => {
  const { data: session } = useSWR("/api/getUserSession");
  const {swrFetcher} = useFetchSwr()

  const {
    data: userPlaylists,
  }: { data: Array<TPlaylists> | undefined | null } = swrFetcher<TPlaylists[] | undefined | null>(
    "/supabase/reads/UserPlaylists",
    () => getUserDataOnSupabase("UserPlaylists", session),
    {
      keepPreviousData: true,
    }
  );

  return (
    <>
      <Title />
      <Grid
        gap={2}
        justifyItems={"center"}
        templateColumns={{
          sm: "repeat(3 , 1fr)",
          lg: "repeat(2 , 1fr)",
          "2xl": "repeat(3 , 1fr)",
        }}
      >
        {_.sortBy(userPlaylists, "created_at")
          ?.slice(0, 6)
          .map((playlist  : TPlaylists) => {
            return (
              <Box
                key={playlist.id}
                w={"full"}
                h={[98, 130, 165, 125]}
                position={"relative"}
                rounded={10}
                overflow={"hidden"}
              >
                <Images playlist={playlist} />
                <Names playlist={playlist} />
              </Box>
            );
          })}
      </Grid>
    </>
  );
};

export default Playlists;
