import {Show, Stack, VStack} from "@chakra-ui/react";
import { useEffect } from "react";
import Artist from "~/Artist";
import Songs from "~/Songs";
import { useRecoilState, useRecoilValue } from "recoil";
import { ARTISTS_ID, ARTISTS_NAME } from "../../recoil/atoms/atoms";
import Related from "./Related/Related";
import { TArtistId, TArtist, TSongs, TRelated } from "../TMainData";
import useFetchSwr from "../../hooks/useFetchSwr";
import fetcherQuery from "../../graphQl/query/fetcher/fetcherQuery";
import { randomSingerUS } from "../../utils/randomBestArtists";
import { SCHEMA_ARTISTS_ID } from "../../graphQl/query/schema/getIdArtistByName";
import { SCHEMA_ARTISTS_INFO } from "../../graphQl/query/schema/getArtistInfoById";
import { TArtistInfo } from "../TMainData";
import { randomSingerUSIds } from "../../utils/randomBestArtists";
import {ScaleLoader} from "react-spinners";

const Suggest = () => {
  const artistsNames = useRecoilValue<undefined | string>(ARTISTS_NAME);
  const [artistsIds, setArtistsIds] = useRecoilState<undefined | string>(
    ARTISTS_ID
  );

  const { swrFetcher } = useFetchSwr();

  const {
    data: { find } = { find: undefined },
  }: {
    data:
      | {
          find:
            | { __typename: string; artists: { items: Array<{ id: string }> } }
            | undefined;
        }
      | undefined;
  } = swrFetcher<TArtistId | undefined>(
    ["/graphql/query/schema/getArtistsByName", artistsNames],
    artistsNames
      ? ([_, singerName]) =>
          fetcherQuery(SCHEMA_ARTISTS_ID, {
            name: singerName || randomSingerUS,
          })
      : null,
    {
      keepPreviousData: false,
      onFocus: true,
    }
  );

  const {
    data: { artist, songs, related } = {
      artist: undefined,
      songs: undefined,
      related: undefined,
    },
  }: {
    data:
      | {
          artist: TArtist | undefined;
          songs: TSongs | undefined;
          related: TRelated | undefined;
        }
      | undefined;
  } = swrFetcher<TArtistInfo | undefined>(
    ["/graphql/query/schema/getArtistById", artistsIds],
    artistsIds
      ? ([_, artistsIds]) =>
          fetcherQuery(SCHEMA_ARTISTS_INFO, { artistId: artistsIds })
      : null,
    {
      keepPreviousData: true,
      onFocus: true,
    }
  );

  useEffect(() => {
    setArtistsIds(randomSingerUSIds);
  }, []);

  const artistPickId = find?.artists?.items[0]?.id;

  useEffect(() => {
    if (artistPickId) {
      setArtistsIds(artistPickId);
    }
  }, [artistPickId]);

  return (
    <VStack
      justify="center"
      align="center"
      w={"full"}
      h={["auto", "auto", "auto", "100vh"]}
      pb={[8, 8, 0]}
    >
        {
            artist && songs && related ?
                <Stack direction={["column", "column", "column", "row"]}>
                    <Related related={related} />
                    <Artist artist={artist} />
                    <Songs songs={songs} />
                </Stack>
                :
            <>
                <Show above={"lg"}>
                    <ScaleLoader width={25} height={80} color="#7886FF" />
                </Show>
                <Show below={"lg"}>
                    <ScaleLoader width={5} height={25} color="#7886FF" />
                </Show>
            </>

        }
    </VStack>
  );
};

export default Suggest;
