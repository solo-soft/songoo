import { TSession } from "../components/TSession";
import useSWR from "swr";
import getUserDataOnSupabase from "../supabase/reads/getUserDataOnSupabase";
import { createContext, ReactNode, useEffect, useState } from "react";
import {NextRouter, useRouter} from "next/router";
import getUserSongsPlaylist from "../supabase/reads/getUserSongsPlaylist";
import useFetchSwr from "../hooks/useFetchSwr";
import {TCollection} from "../components/Collection/TCollection";

export const CollectionContext = createContext({});

type TSwitchCase = {
  key : string
  dbTables:string;
  property:string;
};

const getCollectionInfo = (query ,asPath): TSwitchCase => {

  switch (asPath) {
    case "/collection/likes":
      return {
        key : "getUserLikes",
        dbTables: "UserLikedSong",
        property: "likes",
      };
    case "/collection/recently-played":
      return {
        key : "getUserRecentlyPlayed",
        dbTables: "UserRecentlyPlayed",
        property: "recently",
      };
    case "/collection/playlists/list":
      return {
        key : "getUserPlaylists",
        dbTables: "UserPlaylists",
        property: "playlists",
      };
    case `/collection/playlists/${query?.slug}`:
      return {
        key : "getUserPlaylistItems",
        dbTables: "UserPlaylists",
        property: "playlist-songs",
      };
    default:
      return {
        key : "getUserLikes",
        dbTables: "UserLikedSong",
        property: "likes",
      };
  }
};

const CollectionProvider = ({ children }: { children: ReactNode }) => {

  const { swrFetcher } = useFetchSwr();


  const {query , asPath} : NextRouter = useRouter();


  const { data: session }= useSWR("/api/getUserSession");

  const check = asPath === `/collection/playlists/${query?.slug}`

  console.log(check)

  const {key , property , dbTables} = getCollectionInfo(query , asPath)

  const { data: interactionsCollections }: { data: TCollection[] | undefined | null } =
    swrFetcher<TCollection[] | undefined | null>(
      [key, query , asPath],
      ([_ , query , asPath]) =>
          check ?
              getUserSongsPlaylist(dbTables, session, query?.slug) :
              getUserDataOnSupabase(dbTables, session) ,
      {
        keepPreviousData: false,
      }
    );

  console.log(interactionsCollections)

  return (
    <CollectionContext.Provider
      value={{
        interactionsCollections,
        property
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

export default CollectionProvider;
