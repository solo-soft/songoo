import { Divider, HStack, Stack } from "@chakra-ui/react";
import Title from "./Title/Title";
import Crumb from "./Crumb";

const Header = () => {
  return (
    <Stack
      w={"full"}
      position={"relative"}
      bg={"#111111"}
      h={230}
      align={"center"}
      justify={"center"}
      my={5}
      rounded={15}
    >
      <Crumb />

      <Title />
    </Stack>
  );
};

export default Header;
