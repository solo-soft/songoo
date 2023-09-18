import {Box, Stack, Text} from "@chakra-ui/react";
import {useTheme} from "@chakra-ui/react";
import _ from "lodash";


const Name = ({songs ,  property}) => {

    const theme = useTheme()
    const fontColor =  _.get(theme, `font.color.section.${property}`);
    const singersName = _.map(songs?.artists , value => _.capitalize(value.name))
    return (
        <Stack spacing={0} flex={[1 , 1 , .55]}>
            <Text noOfLines={1} color={fontColor?.secondary} fontSize={["xl" , "xl" , "4xl"]} fontWeight={"bold"}>{songs?.name}</Text>
            <Text noOfLines={1} color={fontColor?.tertiary}  fontSize={["xs" , "xs" , "sm"]}>{singersName.join(" , ")}</Text>
        </Stack>
    );
};

export default Name;
