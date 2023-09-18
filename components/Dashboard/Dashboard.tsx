import { VStack } from "@chakra-ui/react";
import Header from "../Header/Header";
import Panels from "./Panels/Panels";

const Dashboard = () => {
  return (
    <VStack h={["auto", "auto" , "auto", "100vh"]}>
      <Header position={"relative"} />
      <Panels />
    </VStack>
  );
};

export default Dashboard;
