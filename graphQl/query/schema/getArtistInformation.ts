import {gql} from "@apollo/client";
import {client} from "../../client/client";
import {apolloClient} from "../../../utils/apolloClients";


const query = gql`
    query getArtistInfo($artistId : String) {
        getArtistInfo(artistId : $artistId) @rest(type : "artist-information" , path : "/artists/{args.artistId}") {
            images
            name
            id
            uri
            popularity
            followers {
                total
            }
        }
        getArtistTopTracks(artistId : $artistId) @rest(type : "artist-information" , path : "/artists/{args.artistId}/top-tracks?market=ES"){
            tracks {
                album {
                    artists {
                        id
                        name
                    }
                    id
                    images
                    name
                    release_date
                }
                id
                name
                duration_ms
                preview_url
            }
        }

        getAlbumsOfArtist(artistId : $artistId) @rest(type : "artist-information" , path : "/artists/{args.artistId}/albums?market=US") {
            items {
                artists {
                    id
                    name
                }
                id
                images
                name
                release_date
            }
        }

        getRelatedArtist(artistId : $artistId) @rest(type : "artist-information" , path : "/artists/{args.artistId}/related-artists") {
            artists {
                id
                images
                name
            }
        }
    }

`





export const getArtistInformation = async (artistId) =>
{
    const {client} = await apolloClient
    try {
        const {data , errors} = await client.query({query , variables : {artistId}})
        if (errors || data == null) throw new Error("")
        return await data
    }
    catch (error)
    {
        throw new Error(`query / get artists information by id have issue!`)
    }
}
