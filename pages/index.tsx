import { SWRConfig, unstable_serialize } from "swr";
import Head from "next/head";
import { SCHEMA_ARTISTS_ID } from "../graphQl/query/schema/getIdArtistByName";
import { SCHEMA_ARTISTS_INFO } from "../graphQl/query/schema/getArtistInfoById";
import { randomSingerIR, randomSingerUS , randomSingerUSIds } from "../utils/randomBestArtists";
import verifyToken from "../utils/verifyToken";
import { Main } from "../components/main";
import RecentlyProvider from "../provider/RecentlyProvider";
import PinnedProvider from "../provider/PinnedProvider";
import CreatePlaylist from "../components/CreatePlaylist/CreatePlaylist";
import fetcherQuery from "../graphQl/query/fetcher/fetcherQuery";
import { NextApiRequest, NextApiResponse } from "next";
import {Error} from "../components/Error";
import { AbsoluteCenter, Text } from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {supabase} from "../supabase/createClient";



export default function Home({
  fallback,
  error,
}: {
  fallback: {};
  error : {
    status : number
    log : {message : string}
  }
}): null | JSX.Element {

  if (error) {
    return (
      <AbsoluteCenter>
        <Error code={error.status} log={error.log}/>
      </AbsoluteCenter>
    );
  }

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
  req,
}: {
  req: NextApiRequest;
}) => {

  // const accessToken = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/accessToken`,
  //   {
  //     method: "GET",
  //   }
  // );
  // const status = accessToken.status
  // const res = await accessToken.json()
  //
  // console.log(status)
  //
  // if (status === 500) {
  //   return {
  //     props: {
  //       error: {
  //         status : status,
  //         log : res
  //       },
  //     },
  //   };
  // }




  const session = verifyToken(req);
  //
  // const findArtistsId = await fetcherQuery(SCHEMA_ARTISTS_ID, {
  //   name: randomSingerUS,
  // });
  //
  // console.log(findArtistsId?.find?.result?.artists?.items[0].id)
  //
  // const getArtist = await fetcherQuery(SCHEMA_ARTISTS_INFO, {
  //   artistId: randomSingerUSIds
  // });
  //

  return {
    props: {
      fallback: {
        "/api/getUserSession": session,
        // [unstable_serialize(["/graphql/query/schema/getArtistById", undefined,])]: getArtist,
      },
    },
  };
};
