import Suggest from "./Suggest/Suggest";
import Header from "./Header/Header";
import {Stack} from "@chakra-ui/react";


export const Main = ({ randomSingerUS } : {randomSingerUS : string}) => {
    return (
        <Stack position={"relative"}>
            <Header position={"absolute"}/>
            <Suggest/>
        </Stack>
  );
};
