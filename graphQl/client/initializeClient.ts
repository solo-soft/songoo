import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const initializeClient = async () => {
  // const fetchToken = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/accessToken`,
  //   { method: "GET" }
  // );
  // const res = await fetchToken.json();


  const spotifyAccessToken =await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  });

  const res = await spotifyAccessToken.json()

  console.log(res)



  const restLink: RestLink = new RestLink({
    uri: "https://api.spotify.com/v1",
    headers: {
      Authorization: `Bearer ${res?.access_token}`,
    },
  });

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache(),
    link: restLink,
  });
  return {
    client,
    status: spotifyAccessToken.status,
  };
};

export const apolloClient = initializeClient();
