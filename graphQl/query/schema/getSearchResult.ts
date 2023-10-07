import {gql} from "@apollo/client";
import {apolloClient} from "../../client/SpotifyClient(AccessToken)";





const query = gql`
    query SEARCH_RESULT($value : String) {
        SEARCH_RESULT(value : $value) @rest(type : "search" , path : "/search?q={args.value}&type=album,track,artist&market=es&limit=20"){
            albums {
                items {
                    id
                    images
                    name
                    artists {
                        id
                        name
                    }
                }
            }
            artists {
                items {
                    id
                    name
                    images
                    popularity
                }
            }
            tracks {
                items {
                    id
                    name
                    popularity
                    duration_ms
                    preview_url
                    album {
                        id
                        images
                        name
                    }
                    artists {
                        id
                        name
                    }
                }
            }
        }
    }

`


export const getSearchResult = async (value : any) => {


    const {client} : any = await apolloClient

    try {
        const {data, error} = await client.query({query, variables: {value}})
        if (error) return error
        return data
    } catch (error) {
        console.log(error)
    }
}
