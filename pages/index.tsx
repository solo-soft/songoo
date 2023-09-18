import { SWRConfig, unstable_serialize } from "swr";
import Head from "next/head";
import { SCHEMA_ARTISTS_ID } from "../graphQl/query/schema/getIdArtistByName";
import { SCHEMA_ARTISTS_INFO } from "../graphQl/query/schema/getArtistInfoById";
import { randomSingerIR, randomSingerUS } from "../utils/randomBestArtists";
import { useLayoutEffect } from "react";
import verifyToken from "../utils/verifyToken";
import { useRouter } from "next/router";
import { Main } from "../components/main";
import RecentlyProvider from "../provider/RecentlyProvider";
import PinnedProvider from "../provider/PinnedProvider";
import CreatePlaylist from "../components/CreatePlaylist/CreatePlaylist";
import fetcherQuery from "../graphQl/query/fetcher/fetcherQuery";
import { NextRequest, NextResponse } from "next/server";
import {NextApiRequest, NextApiResponse} from "next";

export default function Home({
  fallback,
  ActionErrors,
}: {
  fallback: {};
  ActionErrors: { message: string };
}): null | JSX.Element {
  const router = useRouter();

  useLayoutEffect(function (): (() => Promise<boolean>) | (() => null) | any {
    if (ActionErrors) {
      return () => router.push("/error");
    }
    return () => null;
  }, []);

  if (ActionErrors) return null;

  return (
    <>
      <Head>
        <title>Songoo</title>
      </Head>
      <SWRConfig value={{ fallback }}>
        <RecentlyProvider>
          <PinnedProvider>
            <Main />
            <CreatePlaylist />
          </PinnedProvider>
        </RecentlyProvider>
      </SWRConfig>
    </>
  );
}

export const getServerSideProps = async ({
  res,
  req,
}: {
  res: NextApiResponse;
  req: NextApiRequest;
}) => {

  try {
    //?Get user valid session
    const session = verifyToken(req);
    const findArtistsId = await fetcherQuery(SCHEMA_ARTISTS_ID, {
      name: randomSingerUS,
    });

    if (!findArtistsId) throw new Error("find id have issue");

    const {
      find: {
        artists: { items },
      },
    } = findArtistsId;

    const artistsIds = items[0].id;

    const getArtist = await fetcherQuery(SCHEMA_ARTISTS_INFO, {
      artistId: artistsIds,
    });
    if (!getArtist) throw new Error("find artists have issue");

    return {
      props: {
        fallback: {
          "/api/getUserSession": session,
          [unstable_serialize([
            "/graphql/query/schema/getArtistById",
            undefined,
          ])]: getArtist,
        },
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
