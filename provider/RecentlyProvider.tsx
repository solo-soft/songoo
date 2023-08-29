import { createContext } from "react";
import { TRecentlyPlayed } from "../components/Dashboard/Type";
import useSWR from "swr";
import getUserDataOnSupabase from "../supabase/reads/getUserDataOnSupabase";
import { TSession } from "../components/Type";

export const RecentlyPlayedContext = createContext<
  Array<TRecentlyPlayed> | undefined
>(undefined);

const RecentlyProvider = ({ children }) => {

  const { data: session }: { data: TSession | undefined } = useSWR(
    "/api/getUserSession"
  );


  const {
    data: recentlyPlayed,
    error: recentlyPlayedError,
  }: { data: Array<TRecentlyPlayed> | undefined; error: string | undefined } =
    useSWR(
      "/supabase/reads/UserRecentlyPlayed",
      async () => await getUserDataOnSupabase("UserRecentlyPlayed", session)
    );



  return (
    <RecentlyPlayedContext.Provider value={recentlyPlayed}>
      {children}
    </RecentlyPlayedContext.Provider>
  );
};

export default RecentlyProvider;
