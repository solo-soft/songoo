import {TSession} from "../components/Type";
import useSWR from "swr";
import getUserDataOnSupabase from "../supabase/reads/getUserDataOnSupabase";
import {createContext} from "react";


export const PinnedContext = createContext(undefined);

const PinnedProvider = ({children}) => {

    const { data: session }: { data: TSession | undefined } = useSWR(
        "/api/getUserSession"
    );

    const { data: pinnedSongs } = useSWR("/supabase/reads/UserPinned", () =>
        getUserDataOnSupabase("UserPinned", session)
    );


    return (
        <PinnedContext.Provider value={pinnedSongs}>
            {children}
        </PinnedContext.Provider>
    );
};

export default PinnedProvider;
