import {createContext} from "react";
import {TRecentlyPlayed} from "./Dashboard/Type";
import useSWR from "swr";
import getUserDataOnSupabase from "../supabase/reads/getUserDataOnSupabase";


export const RecentlyPlayedContext = createContext<
    Array<TRecentlyPlayed> | undefined
>(undefined);


const RecentlyProvider = ({children}) => {

    const {data : {user : session}} = useSWR("/api/getUserSession")

    const {
      data: recentlyPlayed,
      error: recentlyPlayedError,
    }: { data: Array<TRecentlyPlayed> | undefined; error: string | undefined } =
        useSWR("/supabase/reads/UserRecentlyPlayed", () =>
            getUserDataOnSupabase("UserRecentlyPlayed", session)
        );

    return (
        <RecentlyPlayedContext.Provider value={recentlyPlayed}>
            {children}
        </RecentlyPlayedContext.Provider>
    );
};

export default RecentlyProvider;
