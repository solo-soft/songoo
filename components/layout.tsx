import {Box, Flex, Stack, useTheme} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {ToastContainer} from "react-toastify";
import Header from "./Header/Header";
import {Playback} from "./Playback/Playback";
import CreatePlaylist from "./CreatePlaylist/CreatePlaylist";
import {RecentlyPlayedContext} from "./Dashboard";

export default function Layout({children}) {

    const router = useRouter();

    const {background: {section: {one: {primary : bgSuggest} , two : {primary : bgDashboard}}}} = useTheme()

    let bgColors;

    switch (router.pathname) {
        case "/" :
            bgColors = bgSuggest
            break
        case "/dashboard" :
            bgColors = bgDashboard
            break
        default :
            bgColors = bgSuggest
    }






    return (
        <Box bg={bgColors}>
            <Box position={"relative"} maxW={1450} h={"100vh"} m={"auto"}>
                <ToastContainer
                    position={"top-center"}
                    autoClose={1000}
                    hideProgressBar={false}
                    closeOnClick={true}
                    pauseOnHover={true}
                    draggable={true}
                    progress={undefined}
                    theme={"dark"}
                    closeButton={true}/>
                {children}
                <Playback/>
            </Box>
        </Box>
    )
}
