import {gql} from "@apollo/client";

import {apolloClient} from "../../client/SpotifyClient(AccessToken)";



const query = gql`
    query {
        browser @rest(type : "categories" , path : "/browse/categories?country=US&limit=50"){
            categories {
                items {
                    id
                    name
                    icons
                }
            }
        }
    }
`

export const getSeveralCategories = async () =>
{

    const {client} : any = await apolloClient

    try {
        const {data , error} = await client.query({query})
        if (error) return error
        return data
    }
    catch (error)
    {
        console.log(error)
    }
}
