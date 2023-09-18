import {HStack, Text} from "@chakra-ui/react";
import {TPlaylists} from "../TPlaylists";

const Names = ({playlist} : {playlist : TPlaylists}) => {
    return (
        <HStack
            w={"full"}
            p={1}
            justifyContent={"space-between"}
            bg={"blackAlpha.800"}
            position={"absolute"}
            bottom={0}
        >
            <Text
                fontWeight={"bold"}
                fontSize={"xs"}
                noOfLines={1}
                textAlign={"center"}
                w={"full"}
            >
                {playlist.title}
            </Text>
        </HStack>
    );
};

export default Names;
