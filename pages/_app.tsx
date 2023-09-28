import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { customTheme } from "../theme";
import NextNprogress from "nextjs-progressbar";
import { ParallaxProvider } from "react-scroll-parallax";
import { DevSupport } from "@react-buddy/ide-toolbox-next";
import { ComponentPreviews, useInitial } from "../components/dev";


function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  const router = useRouter();


  return (
    <RecoilRoot>
      <main>

        <NextNprogress color={"#7886FF"} height={5} />
        <ChakraProvider theme={customTheme}>
          <ColorModeProvider
            options={{ initialColorMode: "dark", useSystemColorMode: false }}
          >
            <ParallaxProvider>
              <Layout>
                <DevSupport
                  ComponentPreviews={ComponentPreviews}
                  useInitialHook={useInitial}
                >
                  <Component {...pageProps} />
                </DevSupport>
                {router.pathname !== "/" && router.pathname !== "/auth" && router.pathname !== "/singers"}
              </Layout>
            </ParallaxProvider>
          </ColorModeProvider>
        </ChakraProvider>
      </main>
    </RecoilRoot>
  );
}


export default MyApp
