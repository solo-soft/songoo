import {ChakraProvider , extendTheme} from "@chakra-ui/react";
import {RecoilRoot} from "recoil";
import Layout from "../components/layout";
import 'react-indiana-drag-scroll/dist/style.css';
import "@fontsource/karla"
import NextNprogress from 'nextjs-progressbar';
import {createBrowserSupabaseClient, createServerSupabaseClient} from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import {useState} from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const customTheme = extendTheme({
        styles: {
            global: {
                body: {
                    background : 'black'
                },
                "::-webkit-scrollbar": {
                    width: "6px",
                    height: "6px",
                },
                "::-webkit-scrollbar-track": {
                    bg: "transparent",
                },
                "::-webkit-scrollbar-thumb": {
                    bg: "whiteAlpha.500",
                    borderRadius: "full",
                },
                "::-webkit-scrollbar-thumb:hover": {
                    bg: "gray.600",
                },
            }
        },

    })

    const [supabase] = useState(() => createBrowserSupabaseClient({
                supabaseUrl : process.env.NEXT_PUBLIC_SUPABASE_URL,
                supabaseKey : process.env.NEXT_PUBLIC_SUPABASE_KEY
            }
        )
    )


    return (

        <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
            <RecoilRoot>
                <main style={{fontFamily : 'Karla'}}>
                    <NextNprogress color={'#589846'} height={5}/>
                    <ChakraProvider theme={customTheme}>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </ChakraProvider>
                </main>
            </RecoilRoot>
        </SessionContextProvider>

    )
}
export default MyApp


