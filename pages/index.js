import {SWRConfig, unstable_serialize} from "swr";
import {ApolloProvider} from "@apollo/client";
import {DataBaseClient} from "../graphQl/client/client";
import Head from "next/head";
import getIdArtistByName from "../graphQl/query/schema/getIdArtistByName";
import Suggest from "../components/Suggest/Suggest";
import getArtistInfoById from "../graphQl/query/schema/getArtistInfoById";
import {randomSingerIR, randomSingerUS} from "../utils/randomBestArtists";
import Feeling from "../components/Feeling/Feeling";
import Video from "../components/Video/Video";
import {useEffect} from "react";
import {YOUTUBE_SINGER} from "../recoil/atoms/atoms";
import {useSetRecoilState} from "recoil";
import {useSession} from "@supabase/auth-helpers-react";
import {supabase} from "../supabase/createClient";
import {useAsync} from "react-use";
import {verify} from "jsonwebtoken";
import fetchUserSession from "../utils/fetchUserSession";
import {Button} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {Main} from "../components/main";




export default function Home({fallback , ActionErrors , randomSingerUS}) {

    const setDefaultSinger = useSetRecoilState(YOUTUBE_SINGER)

    const router = useRouter()

    useEffect(() => {
        setDefaultSinger(randomSingerUS)
    } , [])

    if (ActionErrors)
    {
        return <div>
            {ActionErrors.message}

            <Button onClick={() => router.push("/")}>Refresh</Button>
        </div>
    }


    return (
        <>
            <Head>
                <title>Songoo</title>
            </Head>

            <ApolloProvider client={DataBaseClient}>
                <SWRConfig value={{fallback}}>
                 <Main randomSingerUS={randomSingerUS}/>
                </SWRConfig>
            </ApolloProvider>
        </>
    )
// }
}


export const getServerSideProps = async ({req}) => {

    const t = true

    const render = t ? randomSingerUS : randomSingerIR


    try {

        const findArtistsId = await getIdArtistByName(render)


        if (!findArtistsId) throw new Error("find id have issue")

        const {information: {artists: {items}}} = findArtistsId

        const artistId = items[0].id



        const getArtist = await getArtistInfoById(artistId)
        if (!getArtist) throw new Error("find artists have issue")



        //GET USER SESSION
        const session =  fetchUserSession(req)

        console.log(session)





        return {
            props: {
                fallback: {
                    "/api/getUserSession" : session ,
                    [unstable_serialize(["query", "/query/artists/getArtist", undefined])]: getArtist
                },
                randomSingerUS,
            },
        }
    }



    catch (e) {

        console.log("GET ID BY NAME ARTIST QUERY HAVE ISSUE!" + e)

        return {
            props: {
                ActionErrors : {message : "Internet maybe have errors!"}
            },
        }

    }
}



