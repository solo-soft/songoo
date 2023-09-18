import {supabase} from "../../../supabase/createClient";
import {gql} from "@apollo/client";
import {apolloClient} from "../../client/apolloClients";


const GET_ALBUMS = gql`
    query getAlbumsInformation($albumsId : String) {
        albums (albumsId : $albumsId) @rest(type: "albums", path: "/albums/{args.albumsId}") {
            total_tracks
            images
            name
            release_date
            copyrights
            label
            artists {
                id 
                name
            }
            tracks {
                items {
                    artists {
                        id
                        name
                    }
                    duration_ms
                    id
                    name
                    track_number
                    preview_url
                    images
                }
            }
        }
    }
`

export default async function getAlbumsInfoById(albumsId : string | undefined){
    try {
        const {client} = await apolloClient
        const {data} = await client.query({query : GET_ALBUMS, variables: {albumsId}})
        return data
    }
    catch (e)
    {
        console.log("query / get albums information by id have issue!")
        throw new Error("query / get albums information by id have issue!")
    }
}
