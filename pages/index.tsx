import { SWRConfig, unstable_serialize } from "swr";
import { ApolloProvider } from "@apollo/client";
import { DataBaseClient } from "../graphQl/client/client";
import Head from "next/head";
import getIdArtistByName from "../graphQl/query/schema/getIdArtistByName";
import getArtistInfoById from "../graphQl/query/schema/getArtistInfoById";
import { randomSingerIR, randomSingerUS } from "../utils/randomBestArtists";
import { useEffect } from "react";
import { YOUTUBE_SINGER } from "../recoil/atoms/atoms";
import { useSetRecoilState } from "recoil";
import verifyToken from "../utils/verifyToken";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Main } from "../components/main";
import RecentlyProvider from "../provider/RecentlyProvider";
import PinnedProvider from "../provider/PinnedProvider";
import {useAsync} from "react-use";

export default function Home({ fallback, ActionErrors, randomSingerUS }) {


  const router = useRouter();

  useEffect( () => {
    if (ActionErrors) {
      return () => router.push("/error")
    }
  } , [])

  if (ActionErrors) return null



  const setDefaultSinger = useSetRecoilState(YOUTUBE_SINGER);

  useEffect(() => {
    setDefaultSinger(randomSingerUS);
  }, [router.pathname]);



  return (
    <>
      <Head>
        <title>Songoo</title>
      </Head>
      {/*<ApolloProvider client={DataBaseClient}>*/}
        <SWRConfig value={{ fallback }}>
          <RecentlyProvider>
            <PinnedProvider>
              <Main randomSingerUS={randomSingerUS} />
            </PinnedProvider>
          </RecentlyProvider>
        </SWRConfig>
      {/*</ApolloProvider>*/}
    </>
  );
}

export const getServerSideProps = async ({ res, req }) => {


  //GET USER SESSION
  const session = verifyToken(req);

  try {
    const t = true;
    const render = t ? randomSingerUS : randomSingerIR;

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
    return {
      props: {
        ActionErrors: { message: "Internet maybe have errors!" },
      },
    };
  }
};
