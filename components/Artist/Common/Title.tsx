import {Divider, Stack, Text, useTheme} from "@chakra-ui/react";
import _ from "lodash";

const Title = ({cause}) => {

    const theme = useTheme();
    const { primary , secondary } = _.get(theme, "font.color.section.artist");


    return (
        <Stack>
            <Text color={primary} w={"full"} fontSize={["xl" , "xl" , "4xl"]}   >
                {cause}
            </Text>
            <Divider mb={5} borderWidth={2} rounded={50}/>
        </Stack>
    );
};

export default Title;
