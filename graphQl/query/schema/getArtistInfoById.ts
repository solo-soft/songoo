import { DocumentNode, gql } from "@apollo/client";
import { apolloClient } from "../../client/apolloClients";
import wretch from "wretch";
import httpStatus from "http-status";

export const SCHEMA_ARTISTS_INFO: DocumentNode = gql`
  query getArtistInformation($artistId: String) {
    artist(artistId: $artistId)
      @rest(type: "artist", path: "/artists/{args.artistId}") {
      id
      images {
        url
      }
      name
      popularity
    }
    songs(artistId: $artistId)
      @rest(
        type: "artist"
        path: "/artists/{args.artistId}/top-tracks?market=ES"
      ) {
      tracks {
        album {
          id
          images {
            url
          }
          name
        }
        artists {
          id
          name
        }
        id
        name
        duration_ms
        preview_url
      }
    }

    albums(artistId: $artistId)
      @rest(type: "artist", path: "/artists/{args.artistId}/albums?market=US") {
      items {
        artists {
          id
          name
        }
        id
        images
        name
        release_date
      }
    }

    related(artistId: $artistId)
      @rest(type: "artist", path: "/artists/{args.artistId}/related-artists") {
      artists {
        id
        name
        images {
          url
        }
        uri
      }
    }
  }
`;

export default async function getArtistInfoById(artistId: string | undefined) {

  const apollo = await apolloClient;


  try {
    const { data } = await apollo.client.query({
      query: SCHEMA_ARTISTS_INFO,
      variables: { artistId : artistId},
    });

    return data;
  }
  catch (e) {
    throw {
      code: 403,
      reason:  httpStatus[403],
      message:"Your client does not have permission in this location",
      status: 403,
    };
  }
}
