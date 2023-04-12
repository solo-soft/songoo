import {Text} from "@chakra-ui/react";

const Title = () => {
    return (
        <Text
            fontSize={{sm : 20 , md : 40}}
            fontWeight={"bold"}
            color={"white"}
        >
            The latest in the month
        </Text>
    );
};

export default Title;