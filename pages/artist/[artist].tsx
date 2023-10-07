import { Artist } from "../../components/Artist/Artist";
import { SWRConfig, unstable_serialize } from "swr";
import Header from "../../components/Header/Header";
import Head from "next/head";
import verifyToken from "../../utils/verifyToken";
import { NextApiRequest } from "next";
import CreatePlaylist from "../../components/CreatePlaylist/CreatePlaylist";

export default function artist({ fallback }: { fallback: {} }) {
  return (
    <>
      <Head>
        <title>Artists</title>
      </Head>
      <SWRConfig value={{ fallback }}>
        <Header position={"relative"} />
        <Artist />
        <CreatePlaylist />
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
