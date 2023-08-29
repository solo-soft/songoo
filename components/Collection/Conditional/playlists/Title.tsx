import {Box, Stack, Text, useTheme} from "@chakra-ui/react";
import _ from "lodash";

const Title = ({collection , property}) => {

    const theme = useTheme()
    const fontColor =  _.get(theme, `font.color.section.${property}`);

    return (
        <Box>
            <Text fontSize={"5xl"} fontWeight={"bold"} color={fontColor?.title}>{collection.title}</Text>
            <Text fontSize={"sm"} fontWeight={"bold"} color={fontColor?.title}>Playlist with {collection?.song_info?.length} songs</Text>
        </Box>
    );
};

export default Title;
