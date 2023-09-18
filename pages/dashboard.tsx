import verifyToken from "../utils/verifyToken";
import { SWRConfig } from "swr";
import { useRouter } from "next/router";
import RecentlyProvider from "../provider/RecentlyProvider";
import PinnedProvider from "../provider/PinnedProvider";
import Dashboard from "../components/Dashboard/Dashboard";
import CreatePlaylist from "../components/CreatePlaylist/CreatePlaylist";
import { NextApiRequest, NextApiResponse } from "next";

const Index = ({ fallback }: { fallback: {} }) => {
  const router = useRouter();

  return (
    <>
      <title>Songoo/Dashboard</title>
      <SWRConfig value={{ fallback }}>
        <RecentlyProvider>
          <PinnedProvider>
            <Dashboard />
            <CreatePlaylist />
          </PinnedProvider>
        </RecentlyProvider>
      </SWRConfig>
    </>
  );
};

export default Index;

export const getServerSideProps = async ({
  res,
  req,
}: {
  res: NextApiResponse;
  req: NextApiRequest;
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
