import {ChakraProvider, ColorModeProvider,} from "@chakra-ui/react";
import {RecoilRoot} from "recoil";
import Layout from "../components/layout";
import {useRouter} from "next/router";
import {customTheme} from "../theme";
import NextNprogress from 'nextjs-progressbar';
import {Playback} from "../components/Playback/Playback";
import 'react-toastify/dist/ReactToastify.min.css';
import {ParallaxProvider} from "react-scroll-parallax";


function MyApp({Component, pageProps: {session, ...pageProps}}) {

    const router = useRouter()

    return (
        <RecoilRoot>
            <main>
                <NextNprogress color={'#46986f'} height={3}/>

                <ChakraProvider theme={customTheme}>
                    <ColorModeProvider options={{initialColorMode: "dark", useSystemColorMode: false}}>
                        <ParallaxProvider>
                            <Layout>
                                <Component {...pageProps} />
                                {router.pathname !== "/" && router.pathname !== "/auth" && router.pathname !== "/login_signup" && router.pathname !== "/singers" &&
                                    <Playback/>
                                }
                            </Layout>
                        </ParallaxProvider>
                    </ColorModeProvider>
                </ChakraProvider>
            </main>
        </RecoilRoot>
    )
}


export default MyApp




