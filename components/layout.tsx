import {Box, Flex, Stack} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {ToastContainer} from "react-toastify";
import Header from "./Header/Header";
import {Playback} from "./Playback/Playback";

export default function Layout({children}) {

    const router = useRouter();

    return (
        <Box position={"relative"} maxW={"1920"} m={"auto"}>
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
            {
                router.pathname === "/singers" || router.pathname === "/auth" ?
                    null :
                    <Header/>
            }
            {children}
            <Playback/>
        </Box>
    )
}
