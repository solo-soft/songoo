import CollectionProvider from "../../../provider/CollectionProvider/CollectionProvider";
import verifyToken from "../../../utils/verifyToken";
import { SWRConfig } from "swr";
import Playlists from "../../../components/Collection/Playlists/Playlists";
import Header from "../../../components/Collection/Common/Header/Header";
import { Divider } from "@chakra-ui/react";
import { NextApiRequest, NextApiResponse } from "next";

const List = ({ fallback }: { fallback: {} }) => {
  return (
      <>
        <title>
          Playlists
        </title>
        <SWRConfig value={{ fallback }}>
          <CollectionProvider>
            <Header />
            <Divider my={5} rounded={"full"} />
            <Playlists />
          </CollectionProvider>
        </SWRConfig>
      </>
  );
};

export default List;

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
