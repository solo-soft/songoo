import {
  HStack,
} from "@chakra-ui/react";
import Title from "./Title";
import RouteCrumb from "./RouteCrumb";

const Header = () => {
  return (
    <HStack w={"full"} justify={"space-between"} py={5}>
      <Title />
      <RouteCrumb />
    </HStack>
  );
};

export default Header;
