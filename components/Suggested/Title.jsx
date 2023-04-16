import {Text} from "@chakra-ui/react";

const Title = () => {
    return (
        <Text
            fontSize={{sm : 20 , md : 25 , lg : 35 , xl : 40}}
            textAlign={{sm : "start" , md : "center" , lg : "center" , xl : "start"}}
            fontWeight={"bold"}
            color={"white"}
        >
            It is suggested to you
        </Text>
    );
};

export default Title;