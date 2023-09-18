import {Hide, HStack, Text, useTheme} from "@chakra-ui/react";
import _ from "lodash";
import useGreetings from "../../../../../hooks/useGreetings";

const Greeting = () => {
    const theme = useTheme()
    const {primary} = _.get(theme , "typo.color")
    const {greeting} = useGreetings()
    return (
        <Hide below={"lg"}>
            <HStack flex={1}>
                <Text
                    fontSize={["sm" , "sm" , "2xl", "2xl" , "3xl"]}
                    fontWeight={"bold"}
                    color={primary}
                >
                    {greeting}
                </Text>
            </HStack>
        </Hide>
    );
};

export default Greeting;
