import React from 'react';
import {Text} from "@chakra-ui/react";
import {useRecoilValue} from "recoil";
import {CURRENT_SINGER} from "../../../../recoil/atoms/atoms";

const Title = () => {
    const currentSinger = useRecoilValue(CURRENT_SINGER);
    return (
        <Text fontWeight={"light"} textAlign={["center" , "center" , "center" , "left"]} fontSize={["sm" , "sm" , "md" , "md" , "2xl"]}>
            Top 10 Tracks of <b>{currentSinger?.singerName}</b>
        </Text>

    );
};

export default Title;
