import {Text, useTheme} from "@chakra-ui/react";
import _ from "lodash";


const Name = ({video}) => {
    const theme = useTheme()
    const {primary} = _.get(theme, "font.color.section.artist");
    return (
        <Text color={primary} noOfLines={1} p={1} fontSize={"sm"} fontWeight={"bold"} >{video?.title}</Text>
    );
};

export default Name;
