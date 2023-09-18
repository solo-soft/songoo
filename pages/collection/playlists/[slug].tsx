import React from "react";
import CollectionProvider from "../../../provider/CollectionProvider";
import Collection from "../../../components/Collection/Collection";
import verifyToken from "../../../utils/verifyToken";
import {SWRConfig} from "swr";
import CreatePlaylist from "../../../components/CreatePlaylist/CreatePlaylist";


const Slug = ({fallback}) => {
  return (
    <SWRConfig value={{fallback}}>
        <CollectionProvider>
            <Collection />
            <CreatePlaylist />
        </CollectionProvider>
    </SWRConfig>
  );
};

export default Slug;


export const getServerSideProps = async ({ req, res}) => {

    const session = verifyToken(req);

    if (!session?.user) {
        res.writeHead(302, { Location: "/" });
        res.end();
        return { props: {} };
    }

    return {
        props: {
            fallback: {
                "/api/getUserSession": session,
            },
        },
    };
};
