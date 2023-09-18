import {gql} from "graphql-tag";
import {apolloClient} from "../../client/apolloClients";


const GET_PLAYLIST = gql`
    query GET_FEEL_PLAYLIST($feels : String) {
        feels(feels : $feels) @rest(type : "feels" , path : "/search?q={args.feels}&type=playlist&limit=50") {
            playlists {
                items {
                    id
                    images {
                        url
                    }
                    name
                    owner {
                        display_name
                    }
                }
            }
        }
    }
`

export default async function getFeelPlaylist(feels: string) {
    const {client} = await apolloClient
    const errorMessage: string = "An error has occurred in this =>> (GET FEELS PLAYLIST)"
    try {

        const {data, error} = await client.query({query: GET_PLAYLIST, variables: {feels}})

        // console.log(data)

        if (error) throw new Error(errorMessage)
        return data

    } catch (e) {

        console.log(errorMessage)
        throw new Error(errorMessage)
    }

}
