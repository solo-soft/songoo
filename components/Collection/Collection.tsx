import { Stack } from "@chakra-ui/react";
import Header from "./Conditional/Common/Header/Header";
import Conditional from "./Conditional/Conditional";
const Collection = () => {

  return (
      <Stack w={"full"} h={"full"}>
        <Header />
        {/*<Search />*/}
        <Conditional />
      </Stack>
    )
};

export default Collection;
