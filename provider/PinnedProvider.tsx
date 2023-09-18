import {TSession} from "../components/TSession";
import useSWR from "swr";
import getUserDataOnSupabase from "../supabase/reads/getUserDataOnSupabase";
import {createContext, ReactNode} from "react";
import useFetchSwr from "../hooks/useFetchSwr";
import {TPinned} from "../components/Dashboard/TDashboard";

export const PinnedContext = createContext<TPinned[] | undefined>(undefined);

const PinnedProvider = ({children} : {children : ReactNode}) => {

    const {swrFetcher} = useFetchSwr()

    const { data: session } = useSWR("/api/getUserSession");

    const { data: pinnedSongs } : {data : Array<TPinned> | undefined  | null } = swrFetcher<TPinned>(
        "/supabase/reads/UserPinned",
        () => getUserDataOnSupabase("UserPinned", session),
        {
            keepPreviousData : true
        }
    );
    return (
        <PinnedContext.Provider value={pinnedSongs}>
            {children}
        </PinnedContext.Provider>
    );
};

export default PinnedProvider;
