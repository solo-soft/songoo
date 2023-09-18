import {Hide, Text} from "@chakra-ui/react";
const Title = () => {
    return (
        <Hide above={"lg"}>
            <Text
                textAlign={"center"}
                fontWeight={"bold"}
                order={[3, 3 , 3, 1]}
            >
                Most related
            </Text>
        </Hide>
    );
};

export default Title;
