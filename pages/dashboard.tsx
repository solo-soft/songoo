import UserDashboard from "../components/Dashboard/UserDashboard";
import verifyToken from "../utils/verifyToken";
import { SWRConfig } from "swr";
import Header from "../components/Header/Header";
import { useRouter } from "next/router";
import { VStack } from "@chakra-ui/react";
import RecentlyProvider from "../provider/RecentlyProvider";
import PinnedProvider from "../provider/PinnedProvider";

const Dashboard = ({ fallback }) => {
  const router = useRouter();

  return (
    <>
      <title>Songoo/Dashboard</title>
      <SWRConfig value={{ fallback }}>
        <RecentlyProvider>
          <PinnedProvider>
            <VStack h={"100vh"}>
              <Header position={"relative"} />
              <UserDashboard/>
            </VStack>
          </PinnedProvider>
        </RecentlyProvider>
      </SWRConfig>
    </>
  );
};

export default Dashboard;

export const getServerSideProps = async ({ res, req }) => {
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
