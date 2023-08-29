import { Artist } from "../../components/Artist/Artist";
import { SWRConfig, unstable_serialize } from "swr";
import { ApolloProvider } from "@apollo/client";
import { DataBaseClient } from "../../graphQl/client/client";
import Header from "../../components/Header/Header";
import Head from "next/head";
import verifyToken from "../../utils/verifyToken";
import getArtistInfoById from "../../graphQl/query/schema/getArtistInfoById";
import { Stack } from "@chakra-ui/react";
import {useEffect} from "react";
import {useRef} from "react";
import {useRouter} from "next/router";

export default function artist({ fallback }) {



  const myRef = useRef()
  const router = useRouter()

  useEffect(() => {
    if (myRef.current) {
      myRef.current.scrollTop = 0;
    }

  } , [router.query])

  return (
    <ApolloProvider client={DataBaseClient}>
      <Head>
        <title>Artists</title>
      </Head>


      <SWRConfig value={{ fallback }}>
        <Stack ref={myRef} h={"full"} overflow={"auto"}>
          <Header position={"relative"} />
          <Artist />
        </Stack>
      </SWRConfig>
    </ApolloProvider>
  );
}

export const getServerSideProps = async ({
  req,
  res,
  params: { artist: artistId },
}) => {
  const session = verifyToken(req);



  try {
    const artist = await getArtistInfoById(artistId);
    return {
      props: {
        fallback: {
          "/api/getUserSession": session,
          "/graphQl/query/schema/getArtistInfoById": artist,
        },
      },
    };
  } catch (e) {
    res.writeHead(302, { Location: "/error" });
    res.end();
  }
};
