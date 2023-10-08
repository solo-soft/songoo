import { Box } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import { Playback } from "./Playback/Playback";
import { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { ERROR_INFO } from "../recoil/atoms/atoms";
import useDetectConnection from "../hooks/useDetectConnection";
import ErrorAlert from "./Modals/ErrorAlert";
import RetryToast from "./Modals/RetryToast";
import NetworkAlert from "./Modals/NetworkAlert";
import "react-toastify/dist/ReactToastify.min.css";
import {useRouter} from "next/router";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { detectConnection } = useDetectConnection();
  const errorHandler = useRecoilValue(ERROR_INFO);
  const persistRender = ["/login" , "/signup"]
  return (

      <Box
        position={"relative"}
        overflowX={"hidden"}
        maxW={1920}
        px={5}
        h={"100svh"}
        m={"auto"}
        bg={"#181616"}
      >
        <ToastContainer
          position={"bottom-center"}
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={false}
          draggable={true}
          theme={"colored"}
          newestOnTop={false}
          pauseOnFocusLoss={false}
          closeButton={true}
        />

        {detectConnection ? (
          <>
            <RetryToast />
            <ErrorAlert />
            <Box pointerEvents={errorHandler.retry ? "none" : "auto"}>
              {children}
                {persistRender.every(value => value !== router.pathname) ? <Playback /> : null}
            </Box>
          </>
        ) : (
          <NetworkAlert />
        )}
      </Box>

  );
}
