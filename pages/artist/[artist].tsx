import { Artist } from "../../components/Artist/Artist";
import { SWRConfig, unstable_serialize } from "swr";
import Header from "../../components/Header/Header";
import Head from "next/head";
import verifyToken from "../../utils/verifyToken";
import { Stack } from "@chakra-ui/react";
import { Suspense, useEffect } from "react";
import { useRef } from "react";
import { useRouter } from "next/router";
import { NextApiRequest } from "next";

export default function artist({ fallback }: { fallback: {} }) {

  return (
    <>
      <Head>
        <title>Artists</title>
      </Head>
      <SWRConfig value={{ fallback }}>

          <Header position={"relative"} />
          <Artist />

      </SWRConfig>
    </>
  );
}

export const getServerSideProps = async ({ req }: { req: NextApiRequest }) => {
  const session = verifyToken(req);

  return {
    props: {
      fallback: {
        "/api/getUserSession": session,
        // "/graphQl/query/schema/getArtistInfoById": artist,
      },
    },
  };
};
