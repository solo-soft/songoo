import {SWRConfig, unstable_serialize} from "swr";
import {ApolloClient, ApolloLink, ApolloProvider, InMemoryCache} from "@apollo/client";
import {DataBaseClient} from "../graphQl/client/client";
import Head from "next/head";
import {redirect} from "next/navigation";
import getIdArtistByName from "../graphQl/query/schema/getIdArtistByName";
import {apolloClient} from "../utils/apolloClients";
import Parent from "../components/Parent";
import {NextResponse} from "next/server";
import {getArtistInformation} from "../graphQl/query/schema/getArtistInformation";
import getArtistInfoById from "../graphQl/query/schema/getArtistInfoById";
import {randomSingerUS, randomSingerIR} from "../utils/randomBestArtists";
import {Suspense} from "react";
import {ErrorBoundary} from "next/dist/client/components/error-boundary";
import {suggestionKey} from "../swr/keys";

export default function Home({fallback}) {


    return (
        <>
            <Head>
                <title>Home</title>
            </Head>

            <ApolloProvider client={DataBaseClient}>
                <SWRConfig value={{fallback}}>

                    <Parent/>
                </SWRConfig>
            </ApolloProvider>
        </>
    )
// }
}


export const getStaticProps = async () => {

    try {


        const findArtistsId = await getIdArtistByName(randomSingerUS)

        if (!findArtistsId) throw new Error("find id have issue")

        const {information: {artists: {items}}} = findArtistsId

        const artistId = items[0].id


        const getArtist = await getArtistInfoById(artistId)

        console.log(getArtist)

        if (!getArtist) throw new Error("find artists have issue")


        return {
            props: {
                fallback: {
                    "/query/artists/findId": findArtistsId,
                    [unstable_serialize(["query", "/query/artists/getArtist", undefined])]: getArtist
                },
            },
            revalidate: 60
        }
    } catch (e) {

        console.log("GET ID BY NAME ARTIST QUERY HAVE ISSUE!" + e)

        return {
            props: {
                fallback: {},
            },
            revalidate: 60
        }

    }


}



