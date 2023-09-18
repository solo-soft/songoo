import DotsMenu from "../../../#General/DotsMenu/DotsMenu";
import {HStack, Stack} from "@chakra-ui/react";

const Menu = ({songs}) => {

    return (
        <HStack flex={.5} justify={"flex-end"}>
            <DotsMenu songs={songs} dotsSize={["xl" , "xl" , "4xl"]}/>
        </HStack>
    );
};

export default Menu;
