import {Text, useTheme} from "@chakra-ui/react";
import _ from "lodash";
import {TYoutubeMusicVideo} from "./Videos";


const Name = ({video}: { video: TYoutubeMusicVideo["information"] }) => {
    const theme = useTheme()
    const {primary} = _.get(theme, "font.color.section.artist");
    return (
        <Text color={primary} noOfLines={1} px={5} py={1} fontSize={"sm"} fontWeight={"bold"} >{video?.title}</Text>
    );
};

export default Name;
