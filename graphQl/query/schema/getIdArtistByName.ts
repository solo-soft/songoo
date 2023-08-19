import {ApolloClient, ApolloError, gql} from "@apollo/client";


import {apolloClient} from "../../../utils/apolloClients";

const GET_ID = gql`
    query SUGGEST_ARTISTS( $name : String) {
        information(name : $name) @rest(type : "suggestion" , path : "/search?q={args.name}&type=album%2Cartist&limit=1") {
            artists {
                items {
                    id
                }
            }
        }
    }
`;

export default async function getIdArtistByName(randomSingerUS : string | undefined) {

    try {
        const {client} = await apolloClient
        const {data , error} = await client.query({query : GET_ID, variables: {name: randomSingerUS}})
        return data
    }
    catch (e) {
        console.log("query / get artists id by name have issue!")
        throw new Error("query / get artists id by name have issue!")
    }

}


