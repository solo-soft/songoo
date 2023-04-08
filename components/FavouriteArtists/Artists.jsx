import {AbsoluteCenter, Box, Stack, Text , HStack} from "@chakra-ui/react";
import Image from "next/image";



const Artists = ({artist : {id , name , images} , artistID , handelSelect}) => {
    return (

        <HStack mr={2} overflow={"hidden"} rounded={"full"} position={"relative"} flex={"none"}>

            <Box w={{sm : 150 , md : 180}}
                 h={{sm : 150 , md : 180}}
                 transition={".3s"}
                 transform={id === artistID ? "scale(.95)" : "scale(1)"}
                 opacity={id === artistID ? "50%" : "100%"}
                 zIndex={1}
                 rounded={"full"}
                 overflow={"hidden"}>
                <Image
                    layout={"fill"}
                    onClick={() => handelSelect(id)}
                    placeholder={"blur"}
                    blurDataURL={images[2].url}
                    src={images[0].url}
                />

            </Box>

            {id === artistID && (
                <AbsoluteCenter w={"full"}  zIndex={2}>
                    <Text p={{sm : 1 , md : 2}} fontWeight={"bold"} fontSize={{sm : 12 , md : 15}} >{name}</Text>
                </AbsoluteCenter>
            )}
        </HStack>


    );
};

export default Artists;