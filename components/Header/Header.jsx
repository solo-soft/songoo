import React from 'react';
import {Icon, HStack, Text, Box, VStack} from "@chakra-ui/react";
import {Searchbar} from "../Searchbar/Searchbar";
import {Account} from "./Account";
import Greetings from "./Greetings";
import {HAMBURGER_MENU} from "../../recoil/atoms/atoms";
import {useSetRecoilState} from "recoil";
import {AiFillHeart, AiFillSave, AiOutlineHistory} from "react-icons/ai"
import {useTheme} from "@chakra-ui/react";
import useSWR from "swr";
import fetchUserSession from "../../utils/fetchUserSession";



const Header = () => {

    const {icons : {color : {heart , history , saved }} , typo : {color : {primary}}} = useTheme()

    const openHamburger = useSetRecoilState(HAMBURGER_MENU)


    return (
        <HStack position={"absolute"} w={"full"} justify={"space-between"} p={5}>

            <HStack justify={"flex-start"} align={"center"} flex={1}>

                {/*<IconButton*/}
                {/*    aria-label={'HamburgerMenu'}*/}
                {/*    icon={<FiMenu size={25}/>}*/}
                {/*    bg={"none"}*/}
                {/*    display={{sm: "block", md: "block" , lg : "block" , xl : "none"}}*/}
                {/*    onClick={() => openHamburger(prev => !prev)} size={"xs"}/>*/}



                <Text
                    fontSize={{sm: 20, md: "4xl"}}
                    fontWeight={"bold"}
                    color={primary}>
                    <Greetings/>
                </Text>
                <Searchbar/>

            </HStack>


            <HStack flex={1} justify={"center"}>
                <VStack p={2} bg={"#252525"} rounded={5}>
                    <Icon as={AiFillHeart} fontSize={25} color={heart}/>
                </VStack>
                <VStack p={2} bg={"#252525"} rounded={5}>
                    <Icon as={AiOutlineHistory} fontSize={25} color={history}/>
                </VStack>
                <VStack p={2} bg={"#252525"} rounded={5}>
                    <Icon as={AiFillSave} fontSize={25} color={saved}/>
                </VStack>
            </HStack>

            <HStack flex={1} justify={"end"}>
                <Account/>
            </HStack>
        </HStack>
    );
};

export default Header;
