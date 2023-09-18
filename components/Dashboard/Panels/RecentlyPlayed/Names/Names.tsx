import {Text} from "@chakra-ui/react";
import React from "react";
import {TRecentlyPlayed} from "../../../TDashboard";

const Names = ({song_info} : {song_info : Partial<TRecentlyPlayed["song_info"]> }) => {
    return (
        <Text flex={1} p={{sm : 1 , lg : 0}} noOfLines={1} fontWeight={"bold"} fontSize={{sm : "2xs" , xl : "xs"}}>
            {song_info.name}
        </Text>
    );
};

export default Names;
