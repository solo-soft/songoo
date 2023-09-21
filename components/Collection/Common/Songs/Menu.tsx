import DotsMenu from "../../../#General/DotsMenu/DotsMenu";
import {HStack, Stack} from "@chakra-ui/react";
import {TSongs} from "./Songs";

const Menu = ({songs} : TSongs) => {

    return (
        <HStack flex={[.5 , .5 , .5]} justify={"center"}>
            <DotsMenu songs={songs} dotsSize={["xl" , "xl" , "4xl"]}/>
        </HStack>
    );
};

export default Menu;
