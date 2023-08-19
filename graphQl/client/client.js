import {RestLink} from "apollo-link-rest";
import {ApolloClient, ApolloLink, InMemoryCache} from "@apollo/client";
import {FETCH_ACCESS_TOKEN} from "../../lib/FetcherFuncs/FETCH_ACCESS_TOKEN";



async function initializeClient() {

    const token = await FETCH_ACCESS_TOKEN();

    const restLink = new RestLink({
        uri: 'https://api.spotify.com/v1',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return  new ApolloClient({
        cache: new InMemoryCache(),
        link: ApolloLink.from([restLink]),
    });

}

export const client = initializeClient();



export const DataBaseClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri : `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`
});



const youtubeRestLink = new RestLink({
    uri:"https://youtube138.p.rapidapi.com",
    headers: {
        'X-RapidAPI-Key': '269926aecemsh263311c0955020ep18fd21jsnd518d7a7071a',
        'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
});

export const youtubeApolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: youtubeRestLink,
});
