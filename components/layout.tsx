import {Box, Flex, Stack, useTheme} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {ToastContainer} from "react-toastify";
import Header from "./Header/Header";
import {Playback} from "./Playback/Playback";
import CreatePlaylist from "./CreatePlaylist/CreatePlaylist";
import _ from "lodash";
import {useEffect, useState} from "react";
import {produce} from "immer";

import "react-toastify/dist/ReactToastify.min.css";

export default function Layout({children}) {

    const router = useRouter();

    const [bgColors , setBgColors] = useState("one")

    const {background} = useTheme()



    const theme = useTheme()


    useEffect(()=> {

        switch (router.asPath) {
            case "/" :
                setBgColors("one")
                break
            case "/dashboard" :
                setBgColors("two")
                break
            case '/collection/likes':
                setBgColors("likes")
                break
            case '/collection/recently-played':
                setBgColors("recently")
                break
            case '/collection/playlists/list':
                setBgColors("playlists")
                break
            default :
                if (!router.asPath.includes("/list")) {
                    setBgColors("playlists")
                }
                if (router.asPath.includes("/artist")) {
                    setBgColors("artist")
                }
                if (router.asPath.includes("/album")) {
                    setBgColors("album")
                }
                break;
        }

    } , [router.asPath])


    const { primary } = _.get(background, `section.${bgColors}`);

    return (
        <Box bg={primary}>
            <Box position={"relative"} overflow={"hidden"} maxW={1920} px={5} h={"100vh"} m={"auto"}>
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
