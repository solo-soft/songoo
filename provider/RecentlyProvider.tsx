import {createContext, ReactNode} from "react";
import { TRecentlyPlayed } from "../components/Dashboard/TDashboard";
import useSWR from "swr";
import useFetchSwr from "../hooks/useFetchSwr";
import getUserDataOnSupabase from "../supabase/reads/getUserDataOnSupabase";
import { TSession } from "../components/TSession";

export const RecentlyPlayedContext = createContext<
  Array<TRecentlyPlayed> | undefined | null
>(undefined);

const RecentlyProvider = ({ children } : {children  : ReactNode}) => {

  const { data: session } = useSWR(
    "/api/getUserSession"
  );

  const {swrFetcher} = useFetchSwr()


  const {data: recentlyPlayed } : {data : TRecentlyPlayed[] | undefined | null} = swrFetcher<TRecentlyPlayed[] | undefined | null>(
      "/supabase/reads/UserRecentlyPlayed", session.user ? () => getUserDataOnSupabase("UserRecentlyPlayed", session) : null,
          {
            keepPreviousData : true
          }
    );



  return (
    <RecentlyPlayedContext.Provider value={recentlyPlayed}>
      {children}
    </RecentlyPlayedContext.Provider>
  );
};

export default RecentlyProvider;
