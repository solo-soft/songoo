import {gql} from "@apollo/client";

export const SCHEMA_ARTISTS_ID = gql`
    query GetArtistsIds( $name : String) {
        find(name : $name) @rest(type : "suggestion" , path : "/search?q={args.name}&type=artist&limit=1") {
            artists {
                items {
                    id
                    images
                    name
                    popularity
                    genres
                }
            }
        }
    }
`;

