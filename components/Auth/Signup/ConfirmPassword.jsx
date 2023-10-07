import React from 'react';
import {Input} from "@chakra-ui/react";

const ConfirmPassword = ({register}) => {
    return (
        <Input
            {...register("confirmPassword", { required: true })}
            border={"none"}
            _hover={{ bg: "whiteAlpha.200" }}
            _focus={{ bg: "whiteAlpha.200" }}
            _placeholder={{ fontSize: "xs" }}
            size={"sm"}
            fontSize={"xs"}
            bg={"whiteAlpha.200"}
            variant="filled"
            placeholder="Repeat your Password"
        />
    );
};

export default ConfirmPassword;
