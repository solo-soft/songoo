import { TSession } from "../components/Type";
import useSWR from "swr";
import getUserDataOnSupabase from "../supabase/reads/getUserDataOnSupabase";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import getUserSongsPlaylist from "../supabase/reads/getUserSongsPlaylist";
export const CollectionContext = createContext(undefined);

type TCollectionsInfo = {
  dbTables: undefined | string;
  property: undefined | string;
};

const getCollectionInfo = (path: string): TCollectionsInfo => {
  switch (path) {
    case "/collection/likes":
      return { dbTables: "UserLikedSong", property: "likes" };
    case "/collection/recently-played":
      return { dbTables: "UserRecentlyPlayed", property: "recently" };
    case "/collection/playlists/list":
      return { dbTables: "UserPlaylists", property: "playlists" };
    default:
      if (!path.includes("/list")) {
        return { dbTables: "UserPlaylists", property: "playlist-songs" };
      }
      return { dbTables: undefined, property: undefined };
  }
};

const CollectionProvider = ({ children }: { children: any }) => {
  const { asPath, query } = useRouter();

  const [{ dbTables, property }, setCollectionsInfo] =
    useState<TCollectionsInfo>(getCollectionInfo(asPath));

  useEffect(() => {
    setCollectionsInfo(getCollectionInfo(asPath));
  }, [asPath]);

  const { data: session }: { data: TSession | undefined } = useSWR(
    "/api/getUserSession"
  );

  //?Get Likes and Recently played songs
  const { data: interactionsCollections } = useSWR(
    `/supabase/reads/${dbTables}/likes/recently-played/songs`,
    () => {
      if (!dbTables || property == "playlists") return null;
      return getUserDataOnSupabase(dbTables, session);
    }
  );

  //?Get Collection of playlists
  const { data: playlistsCollection } = useSWR(
    `/supabase/reads/${dbTables}`,
    () => {
      if (!dbTables || property != "playlists") return null;
      return getUserDataOnSupabase(dbTables, session);
    }
  );

  //?Get Songs of playlists
  const { data: playlistSongs } = useSWR(
    ["/supabase/reads/playlists/uniqueSong", dbTables, session, query],
    ([_, dbTables, session, query]) => {
      if (!dbTables || property != "playlist-songs") return null;
      return getUserSongsPlaylist(dbTables, session, query?.slug);
    }
  );


  return (
    <CollectionContext.Provider
      value={{
        playlistsCollection,
        interactionsCollections,
        playlistSongs,
        property,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

export default CollectionProvider;
