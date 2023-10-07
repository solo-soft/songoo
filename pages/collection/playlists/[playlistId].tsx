import React from "react";
import CollectionProvider from "../../../provider/CollectionProvider/CollectionProvider";
import verifyToken from "../../../utils/verifyToken";
import { SWRConfig } from "swr";
import CreatePlaylist from "../../../components/CreatePlaylist/CreatePlaylist";
import PlaylistsItems from "../../../components/Collection/PlaylistItems/PlaylistsItems";
import Header from "../../../components/Collection/Common/Header/Header";
import { NextApiRequest, NextApiResponse } from "next";

const PlaylistId = ({ fallback }: { fallback: {} }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <CollectionProvider>
        <Header />
        <PlaylistsItems />
        <CreatePlaylist />
      </CollectionProvider>
    </SWRConfig>
  );
};

export default PlaylistId;

export const getServerSideProps = async ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
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
