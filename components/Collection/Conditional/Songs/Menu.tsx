import DotsMenu from "../../../Dashboard/TopTenTracks/Tracks/DotsMenu";
import {HStack, Stack} from "@chakra-ui/react";

const Menu = ({songs}) => {
    return (
        <HStack flex={.5} justify={"flex-end"}>
            <DotsMenu songs={songs.song_info} dotsSize={"6xl"}/>
        </HStack>
    );
};

export default Menu;
