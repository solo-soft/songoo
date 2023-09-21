import useSWR from "swr";
import getUserDataOnSupabase from "../../supabase/reads/getUserDataOnSupabase";
import { Context, createContext, ReactNode } from "react";
import { NextRouter, useRouter } from "next/router";
import getUserPlaylistItems from "../../supabase/reads/getUserPlaylistItems";
import useFetchSwr from "../../hooks/useFetchSwr";
import {
  TCollection,
  TProperty,
  TCollectionContext,
} from "../../components/Collection/TCollection";
import _ from "lodash";
import { dbIdentifier } from "./dbIdentifier";

export const CollectionContext = createContext<TCollectionContext>({
  collectionInfo: [],
  property: undefined,
});

const CollectionProvider = ({ children }: { children: ReactNode }) => {
  const { swrFetcher } = useFetchSwr();

  const { query, asPath }: NextRouter = useRouter();

  const { data: session } = useSWR("/api/getUserSession");

  const check = asPath === `/collection/playlists/${query?.playlistId}`;

  const { key, property, dbTables } = dbIdentifier(query, asPath);

  const { data }: { data: TCollection[] | undefined | null } = swrFetcher<
    TCollection[] | undefined | null
  >(
    [key, query, asPath],
    ([_, query, asPath]) =>
      check
        ? getUserPlaylistItems(dbTables, session, query?.playlistId)
        : getUserDataOnSupabase(dbTables, session),
    {
      keepPreviousData: false,
      runError: true,
    }
  );

  const collectionInfo: TCollection[] = _.sortBy(
    data,
    (items: TCollection) => -new Date(items.created_at)
  );

  return (
    <CollectionContext.Provider
      value={{
        collectionInfo,
        property,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

export default CollectionProvider;
