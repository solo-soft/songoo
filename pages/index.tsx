import useSWR, { SWRConfig, unstable_serialize } from "swr";
import { ApolloProvider } from "@apollo/client";
import { DataBaseClient } from "../graphQl/client/client";
import Head from "next/head";
import getIdArtistByName from "../graphQl/query/schema/getIdArtistByName";
import getArtistInfoById from "../graphQl/query/schema/getArtistInfoById";
import { randomSingerIR, randomSingerUS } from "../utils/randomBestArtists";
import { createContext, useEffect } from "react";
import { YOUTUBE_SINGER } from "../recoil/atoms/atoms";
import { useSetRecoilState } from "recoil";
import verifyToken from "../utils/verifyToken";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Main } from "../components/main";
import { TRecentlyPlayed } from "../components/Dashboard/Type";
import getUserDataOnSupabase from "../supabase/reads/getUserDataOnSupabase";
import RecentlyProvider from "../components/RecentlyProvider";

export default function Home({ fallback, ActionErrors, randomSingerUS }) {
  const setDefaultSinger = useSetRecoilState(YOUTUBE_SINGER);

  const router = useRouter();




  useEffect(() => {
    setDefaultSinger(randomSingerUS);
  }, [router.pathname]);

  if (ActionErrors) {
    return (
      <div>
        {ActionErrors.message}
        <Button onClick={() => router.push("/")}>Refresh</Button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Songoo</title>
      </Head>
      <ApolloProvider client={DataBaseClient}>
        <SWRConfig value={{ fallback }}>
          <RecentlyProvider>
            <Main randomSingerUS={randomSingerUS} />
          </RecentlyProvider>
        </SWRConfig>
      </ApolloProvider>
    </>
  );
}

export const getServerSideProps = async ({ res, req }) => {
  const t = true;

  const render = t ? randomSingerUS : randomSingerIR;

  try {
    const findArtistsId = await getIdArtistByName(render);

    if (!findArtistsId) throw new Error("find id have issue");

    const {
      information: {
        artists: { items },
      },
    } = findArtistsId;

    const artistId = items[0].id;

    const getArtist = await getArtistInfoById(artistId);
    if (!getArtist) throw new Error("find artists have issue");

    //GET USER SESSION
    const session = verifyToken(req);

    console.log(session);

    return {
      props: {
        fallback: {
          "/api/getUserSession": session,
          [unstable_serialize([
            "query",
            "/query/artists/getArtist",
            undefined,
          ])]: getArtist,
        },
        randomSingerUS,
      },
    };
  } catch (e) {
    console.log("GET ID BY NAME ARTIST QUERY HAVE ISSUE!" + e);
    return {
      props: {
        ActionErrors: { message: "Internet maybe have errors!" },
      },
    };
  }
};
