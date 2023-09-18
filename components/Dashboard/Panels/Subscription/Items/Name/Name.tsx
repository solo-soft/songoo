import {Text} from "@chakra-ui/react";
import {useRecoilValue} from "recoil";
import {CURRENT_SINGER} from "../../../../../../recoil/atoms/atoms";
import {Hide} from "@chakra-ui/react";
import {TSubscriptions} from "../../../../TDashboard";
const Name = ({subscription} : {subscription : TSubscriptions}) => {

    const currentSingerId = useRecoilValue(CURRENT_SINGER)
    const check = currentSingerId?.singerId === subscription.singer.id

    return (
        <Hide below={"lg"}>
            <Text
                noOfLines={1}
                fontSize={["xs" , "sm"]}
                fontWeight={check ? "bold" : "light"}
                color={check ? "#7886FF" : "white"}>
                {subscription.singer.name}
            </Text>
        </Hide>
    );
};

export default Name;
