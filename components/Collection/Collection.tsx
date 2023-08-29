import { useContext } from "react";
import { CollectionContext } from "../../provider/CollectionProvider";
import { Stack } from "@chakra-ui/react";
import Header from "./Conditional/Common/Header/Header";
import Conditional from "./Conditional/Conditional";
import Search from "./Conditional/Common/Search/Search";

type TCollectionProperty = "likes" | "recently" | "playlists";

const Collection = () => {

  return (
      <Stack w={"full"} h={"full"}>
        <Header />
        <Search />
        <Conditional />
      </Stack>
    )
};

export default Collection;
