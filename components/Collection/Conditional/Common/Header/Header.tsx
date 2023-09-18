import {
    Divider,
    HStack, Stack,
} from "@chakra-ui/react";
import Title from "./Title";
import RouteCrumb from "./RouteCrumb";

const Header = () => {
  return (
    <Stack w={"full"} direction={["column" , "column" , "row"]} align={"center"} justify={"space-between"} py={5}>
      <Title />
      <RouteCrumb />
    </Stack>
  );
};

export default Header;
