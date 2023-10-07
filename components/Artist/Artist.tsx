import {AbsoluteCenter, Show, Stack, Text} from "@chakra-ui/react";
import Tracks from "./Tracks/Tracks";
import Albums from "./Albums/Albums";
import Related from "./Related";
import HeroHeader from "./HeroHeader";
import Videos from "./Videos/Videos";
import useFetchSwr from "../../hooks/useFetchSwr";
import { SCHEMA_ARTISTS_INFO } from "../../graphQl/query/schema/getArtistInfoById";
import { useRouter } from "next/router";
import fetcherQuery from "../../graphQl/query/fetcher/fetcherQuery";
import { TAlbums, TArtist, TArtistInfo, TRelated, TSongs } from "./TArist";
import {ScaleLoader} from "react-spinners";

export type TArtistsAlbums = {
  __typename: string;
  items: {
    artists: {
      id: string;
      name: string;
    }[];
    id: string;
    name: string;
    release_date: string;
    images: {
      width: string;
      height: string;
      url: string;
    }[];
  }[];
};

type TProps = {
  artist: TArtist | undefined;
  songs: TSongs | undefined;
  albums: TAlbums | undefined;
  related: TRelated | undefined;
};

export const Artist = () => {
  const { swrFetcher } = useFetchSwr();
  const router = useRouter();

  const { data }: { data: TArtistInfo | undefined } = swrFetcher<
    TArtistInfo | undefined
  >(
    ["/graphQl/query/schema/getArtistInfoById", router],
    ([_, router]) =>
      fetcherQuery(SCHEMA_ARTISTS_INFO, { artistId: router.query.artist }),
    {
      keepPreviousData: false,
      onFocus: false,
    }
  );

  const props: TProps = {
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
          <AbsoluteCenter>
            <Show above={"lg"}>
              <ScaleLoader width={25} height={80} color="#7886FF" />
            </Show>
            <Show below={"lg"}>
              <ScaleLoader width={5} height={25} color="#7886FF" />
            </Show>
          </AbsoluteCenter>
      )}
    </Stack>
  );
};
