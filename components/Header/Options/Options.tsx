import { HStack } from "@chakra-ui/react";
import { Searchbar } from "./Search/Searchbar/Searchbar";
import ThemeColor from "./ThemeControl/ThemeColor";
import Direction from "./Directions/Direction";

const Options = () => {
  return (
    <HStack
      order={[1, 1, 2]}
      display={["grid", "grid", "grid", "flex"]}
      gridTemplateColumns={["repeat(3 , 1fr)", "repeat(3 , 1fr)"]}
      direction={"row"}
      flex={1}
      justify={"center"}
    >
      <Searchbar />

      <Direction />

      <ThemeColor />
    </HStack>
  );
};

export default Options;
