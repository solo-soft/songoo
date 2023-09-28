import {RestLink} from "apollo-link-rest";
import {ApolloClient, InMemoryCache, NormalizedCacheObject} from "@apollo/client";




const restLink: RestLink = new RestLink({
    uri: "https://one-api.ir/spotify/?token=954253:651197b92a268",

})
export const persianClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache(),
    link: restLink,
});

// return {
//     client,
//     status: fetchToken.status,
// };
