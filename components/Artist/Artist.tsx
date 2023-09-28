import { Stack, Text } from "@chakra-ui/react";
import useSWR from "swr";
import Tracks from "./Tracks/Tracks";
import Albums from "./Albums/Albums";
import Related from "./Related";
import HeroHeader from "./HeroHeader";
import Videos from "./Videos/Videos";
import useFetchSwr from "../../hooks/useFetchSwr";
import { SCHEMA_ARTISTS_INFO } from "../../graphQl/query/schema/getArtistInfoById";
import { useRouter } from "next/router";
import fetcherQuery from "../../graphQl/query/fetcher/fetcherQuery";
export const Artist = () => {
  const { swrFetcher } = useFetchSwr();
  const router = useRouter();

  const { data } = swrFetcher(
    ["/graphQl/query/schema/getArtistInfoById", router],
    ([_, router]) =>
      fetcherQuery(SCHEMA_ARTISTS_INFO, { artistId: router.query.artist }),
    {
      keepPreviousData: false,
      onFocus: false,
      runSuspense: false,
    }
  );

  const props = {
    artist: data?.artist,
    songs: data?.songs,
    albums: data?.albums,
    related: data?.related,
  };

  return (
    <Stack>
      {data ? (
        <Stack my={25}>
          <HeroHeader {...props} />
          <Tracks {...props} />
          <Albums {...props} />
          <Videos {...props} />
          <Related {...props} />
        </Stack>
      ) : (
        <Text>Loading ...</Text>
      )}
    </Stack>
  );
};
