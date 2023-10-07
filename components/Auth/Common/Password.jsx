import {Input} from "@chakra-ui/react";

const Password = ({register}) => {
    return (
        <Input
            {...register("password", { required: true })}
            border={"none"}
            _hover={{ bg: "whiteAlpha.200" }}
            _focus={{ bg: "whiteAlpha.200" }}
            _placeholder={{ fontSize: "xs" }}
            size={"sm"}
            fontSize={"xs"}
            bg={"whiteAlpha.200"}
            variant="filled"
            placeholder="Choose a strong Password"
        />
    );
};

export default Password;
