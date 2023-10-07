import React from 'react';
import {Box, Button, HStack, Icon, Text, VStack} from "@chakra-ui/react";
import {useTheme} from "@chakra-ui/react";
import {PiMicrophoneStageBold} from "react-icons/pi"
import {BsMusicPlayerFill , BsMusicNoteList} from "react-icons/bs"
import {MdSportsMartialArts} from "react-icons/md"
import {TbHandRock , TbRocket} from "react-icons/tb"
import {useRecoilState} from "recoil";
import {FEELS} from "../../recoil/atoms/atoms";
import {mutate} from "swr";


const feels = [
    {
        id: Math.random(),
        feel: "Pop",
        icon: PiMicrophoneStageBold
    },
    {
        id: Math.random(),
        feel: "Rock",
        icon: TbHandRock
    },
    {
        id: Math.random(),
        feel: "Rap",
        icon: TbRocket
    },
    {
        id: Math.random(),
        feel: "Classic",
        icon: BsMusicNoteList
    },
    {
        id: Math.random(),
        feel: "Jazz",
        icon: BsMusicPlayerFill
    },
    {
        id: Math.random(),
        feel: "Workout",
        icon: MdSportsMartialArts
    },

]


const Header = () => {

    const {background: {section: {two: {secondary}}}, typo: {color: {primary , tertiary}}, default: {color}} = useTheme()

    const [feel , setFeel] = useRecoilState(FEELS)



    return (
        <HStack w={"full"}  justify={"space-between"}>

            <Text fontSize={{sm: 20, md: "4xl"}}
                  fontWeight={"bold"} color={primary}>What is your mood now</Text>

            <HStack>
                <Box bg={color} p={4} rounded={50}/>


                {
                    feels.map(value => {

                        return (
                            <VStack key={value.id}>

                                {/*<Icon color={tertiary} as={value.icon} fontSize={"2xl"}/>*/}

                                <Button size={"sm"} colorScheme={feel === value.feel ? "purple" : "gray"} onClick={()=> setFeel(value.feel)}>{value.feel}</Button>

                            </VStack>
                        )

                    }).reverse()
                }

            </HStack>


        </HStack>
    );
};

export default Header;
