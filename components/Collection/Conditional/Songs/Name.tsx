import {Box, Stack, Text} from "@chakra-ui/react";
import {useTheme} from "@chakra-ui/react";
import _ from "lodash";


const Name = ({songs ,  property}) => {

    const check = property === "playlist-songs"

    const theme = useTheme()
    const fontColor =  _.get(theme, `font.color.section.${property}`);
    const singersName = _.map(check ? songs?.artists : songs?.song_info?.artists , value => _.capitalize(value.name))


    return (
        <Stack spacing={0} flex={.55}>
            <Text noOfLines={1} color={fontColor?.secondary} fontSize={"4xl"} fontWeight={"bold"}>{check ? songs?.name : songs?.song_info?.name}</Text>
            <Text noOfLines={1} color={fontColor?.tertiary}  fontSize={"sm"}>{singersName.join(" , ")}</Text>
        </Stack>
    );
};

export default Name;
