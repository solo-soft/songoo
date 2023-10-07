import {Input} from "@chakra-ui/react";

const Email = ({register}) => {
    return (
        <Input
            {...register("email", { required: true })}
            border={"none"}
            _hover={{ bg: "whiteAlpha.200" }}
            _focus={{ bg: "whiteAlpha.200" }}
            _placeholder={{ fontSize: "xs" }}
            size={"sm"}
            fontSize={"xs"}
            bg={"whiteAlpha.200"}
            variant="filled"
            placeholder="What is your Email ?"
        />
    );
};

export default Email;
