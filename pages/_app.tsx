import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import Layout from "../components/layout";
import { customTheme } from "../theme";
import NextNprogress from "nextjs-progressbar";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <RecoilRoot>
      <main>
        <NextNprogress color={"#7886FF"} height={5} />
        <ChakraProvider theme={customTheme}>
          <ColorModeProvider
            options={{ initialColorMode: "dark", useSystemColorMode: false }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ColorModeProvider>
        </ChakraProvider>
      </main>
    </RecoilRoot>
  );
}

export default MyApp;
