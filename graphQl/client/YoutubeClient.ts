import { RestLink } from "apollo-link-rest";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const youtubeRestLink = new RestLink({
  uri: "https://inv.bp.projectsegfau.lt/api/v1",
});

export const youtubeApolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: youtubeRestLink,
});
