import {Icon, VStack} from "@chakra-ui/react";
import {RiSunFill} from "react-icons/ri";

const ThemeColor = () => {
    return (
        <VStack p={[2, 2, 1, 1.5, 2]} rounded={5} bg={"#252525"}>
            <Icon as={RiSunFill} color={"orange"} fontSize={25} />
        </VStack>
    );
};

export default ThemeColor;
