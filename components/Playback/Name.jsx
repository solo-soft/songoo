import {Text} from "@chakra-ui/react";
import {useRecoilValue} from "recoil";
import {PLAYBACK_INFORMATION} from "../../recoil/atoms/atoms";

const Name = () => {
    const { indexOfSongs, arrayOfSongs } = useRecoilValue(PLAYBACK_INFORMATION);
    const {name} = arrayOfSongs[indexOfSongs] ?? {};
    return (
        <Text
            flex={1}
            fontWeight={"bold"}
            noOfLines={1}
            fontSize={["xs" , "sm"]}
        >
            {name}
        </Text>
    );
};

export default Name;
