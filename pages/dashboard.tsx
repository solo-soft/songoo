import Index from "../components/Dashboard";
import verifyToken from "../utils/verifyToken";
import { unstable_serialize, SWRConfig } from "swr";
import Header from "../components/Header/Header";
import { useRouter } from "next/router";
import React from "react";
import {VStack} from "@chakra-ui/react";
import {router} from "next/client";
import RecentlyProvider from "../components/RecentlyProvider";
const Dashboard = ({ fallback }) => {
  const router = useRouter();

  return (
    <>
      <title>Songoo/Dashboard</title>
      <SWRConfig value={{ fallback }}>
        <RecentlyProvider>
          <VStack h={"100vh"}>
            <Header />
            <Index />
          </VStack>
        </RecentlyProvider>
      </SWRConfig>
    </>
  );
};

export default Dashboard;

export const getServerSideProps = async ({ res, req }) => {
  const session = verifyToken(req);

  console.log(session);

  if (!session?.user) {
    res.writeHead(302, { Location: '/' });
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
