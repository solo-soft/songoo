import {ApolloClient, InMemoryCache, NormalizedCache, NormalizedCacheObject} from '@apollo/client';
import {RestLink} from 'apollo-link-rest';
import {FETCH_ACCESS_TOKEN} from "../lib/FetcherFuncs/FETCH_ACCESS_TOKEN";


async function initializeClient () {
    try {
        const {token} : any = await FETCH_ACCESS_TOKEN()

        const restLink : RestLink = new RestLink({
            uri: "https://api.spotify.com/v1",
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        });

        const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
            cache: new InMemoryCache(),
            link: restLink
        });

        if (!client) throw Error("Spotify schema connection failed!")

        return {client}
    }
    catch (e) {
        console.log("apollo / cannot receive collection token from spotify ! maybe current ip is collection denied! ")
    }
}



export const apolloClient  =  initializeClient()

