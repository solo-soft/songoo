import {Text, useTheme} from "@chakra-ui/react";
import _ from "lodash";

const Title = ({cause}) => {

    const theme = useTheme();
    const { primary } = _.get(theme, "font.color.section.artist");


    return (
        <Text color={primary} w={"full"} fontSize={"5xl"} fontWeight={"bold"} py={2}>
            {cause}
        </Text>
    );
};

export default Title;
