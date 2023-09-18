import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import wretch from "wretch";
import httpStatus from "http-status";


export async function initializeClient() {

  return await wretch("https://accounts.spotify.com/api/token", {
    mode: "cors",
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
  })
    .post()
    .fetchError(() => {
      throw {
        code: 403,
        reason:  httpStatus[403],
        message:"Your client does not have permission in this location",
        status: 403,
      };
    })
    .res(async (response) => {


      const data: { access_token: string } = await response.json();

      const restLink: RestLink = new RestLink({
        uri: "https://api.spotify.com/v1",
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      console.log(data)


      const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
        cache: new InMemoryCache(),
        link: restLink,
      });

      return {
        client,
      };
    });

}

export const apolloClient = initializeClient();
