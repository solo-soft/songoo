import Suggest from "./Suggest/Suggest";
import Header from "./Header/Header";
import {Stack} from "@chakra-ui/react";

export const Main = () => {
    return (
        <Stack position={"relative"}>
            <Header position={["relative" , "relative" , "relative" , "absolute", "absolute"]}/>
            <Suggest/>
        </Stack>
  );
};

