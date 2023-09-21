import {NextParsedUrlQuery} from "next/dist/server/request-meta";
import {TProperty} from "../../components/Collection/TCollection";

type TSwitchCase = {
    key: string;
    dbTables: string;
    property: TProperty;
};
export const dbIdentifier = (
    query: NextParsedUrlQuery,
    asPath: string
): TSwitchCase => {
    switch (asPath) {
        case "/collection/likes":
            return {
                key: "getUserLikes",
                dbTables: "UserLikedSong",
                property: "likes",
            };
        case "/collection/recently-played":
            return {
                key: "getUserRecentlyPlayed",
                dbTables: "UserRecentlyPlayed",
                property: "recently",
            };
        case "/collection/playlists/list":
            return {
                key: "getUserPlaylists",
                dbTables: "UserPlaylists",
                property: "playlists",
            };
        case `/collection/playlists/${query?.playlistId}`:
            return {
                key: "getUserPlaylistItems",
                dbTables: "UserPlaylists",
                property: "playlist-songs",
            };
        default:
            return {
                key: "getUserLikes",
                dbTables: "UserLikedSong",
                property: "likes",
            };
    }
};
