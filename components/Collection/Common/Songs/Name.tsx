import {Box, Stack, Text} from "@chakra-ui/react";
import {useTheme} from "@chakra-ui/react";
import _ from "lodash";
import {TCollectionContext} from "../../TCollection";
import {useContext} from "react";
import {CollectionContext} from "../../../../provider/CollectionProvider/CollectionProvider";
import {TSongs} from "./Songs";


const Name = ({songs} : TSongs) => {


    const { property }: TCollectionContext = useContext(CollectionContext);

    const theme = useTheme()
    const fontColor =  _.get(theme, `font.color.section.${property}`);
    const singersName = _.map(songs?.artists , value => _.capitalize(value.name))
    return (
        <Stack spacing={0} flex={[1 , 1 , 2]}>
            <Text noOfLines={1} color={fontColor?.secondary} fontSize={["sm" , "xl" , "xl"]} fontWeight={"bold"}>{songs?.name}</Text>
            <Text noOfLines={1} color={fontColor?.tertiary}  fontSize={["xs" , "xs" , "sm"]}>{singersName.join(" , ")}</Text>
        </Stack>
    );
};

export default Name;
