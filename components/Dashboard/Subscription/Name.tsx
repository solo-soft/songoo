import React from 'react';
import {Text} from "@chakra-ui/react";
import {useRecoilState, useRecoilValue} from "recoil";
import {CURRENT_SINGER} from "../../../recoil/atoms/atoms";

const Name = ({value}) => {

    const currentSingerId = useRecoilValue(CURRENT_SINGER)
    const check = currentSingerId?.singerId === value.singer.id

    return (
        <Text
            noOfLines={1}
            fontSize={"sm"}
            fontWeight={check ? "bold" : "light"}
            color={check ? "#7886FF" : "white"}>
            {value.singer.name}
        </Text>
    );
};

export default Name;
