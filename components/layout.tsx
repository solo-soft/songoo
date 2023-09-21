import {
  AbsoluteCenter,
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Icon,
  Stack,
  Text,
  useTheme,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import Header from "./Header/Header";
import { Playback } from "./Playback/Playback";
import CreatePlaylist from "./CreatePlaylist/CreatePlaylist";
import _ from "lodash";
import { RefObject, useEffect, useRef, useState } from "react";
import { produce } from "immer";
import { Offline, Online, Detector } from "react-detect-offline";
import { ToastTransition } from "react-toastify";
import { GoAlertFill } from "react-icons/go";
import { PiArrowClockwiseFill } from "react-icons/pi";
import "react-toastify/dist/ReactToastify.min.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { ERROR_INFO } from "../recoil/atoms/atoms";
import { ArrowForwardIcon, RepeatIcon } from "@chakra-ui/icons";
import { FocusableElement } from "@chakra-ui/utils";
import useDetectConnection from "../hooks/useDetectConnection";
import {ClipLoader} from "react-spinners";

export default function Layout({ children }) {
  const router = useRouter();

  const [bgColors, setBgColors] = useState("one");

  const { detectConnection } = useDetectConnection();

  const [errorHandler, setErrorHandler] = useRecoilState(ERROR_INFO);

  const theme = useTheme();

  const cancelRef: RefObject<FocusableElement> | any = useRef();

  const retryFetchData = () => {
    setErrorHandler((prev) => ({
      ...prev,
      isError: false,
    }));
    return errorHandler.swrMutate();
  };

  // console.log(errorHandler)

  useEffect(() => {
    switch (router.asPath) {
      case "/":
        setBgColors("suggest");
        break;
      case "/dashboard":
        setBgColors("two");
        break;
      case "/collection/likes":
        setBgColors("likes");
        break;
      case "/collection/recently-played":
        setBgColors("recently");
        break;
      case "/collection/Playlists/list":
        setBgColors("playlists");
        break;
      default:
        if (!router.asPath.includes("/list")) {
          setBgColors("playlists");
        }
        if (router.asPath.includes("/artist")) {
          setBgColors("artist");
        }
        if (router.asPath.includes("/album")) {
          setBgColors("album");
        }
        break;
    }
  }, [router.asPath]);

  const bg = _.get(theme, `background.section.${bgColors}`);

  return (
    <Box bg={bg?.primary}>
      <Box
        position={"relative"}
        overflowX={"hidden"}
        maxW={1920}
        px={5}
        h={"100vh"}
        m={"auto"}
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
            <Box pointerEvents={errorHandler.retry ? "none" : "auto"}>
              {children}
              <Playback />
            </Box>

            {
              errorHandler.retry ?
                  <Alert status='warning' variant={"solid"} w={"xs"} position={"fixed"} bottom={4} left={45} rounded={25} zIndex={9999}>
                    <ClipLoader size={25}/>
                    <Text mx={2} fontWeight={"bold"}>
                      Retrying please with...
                    </Text>
                  </Alert>
                  :
                  null

            }


            <AlertDialog
              size={"3xl"}
              motionPreset="slideInRight"
              isCentered
              allowPinchZoom={true}
              autoFocus={false}
              closeOnOverlayClick={false}
              isOpen={errorHandler.isError}
              leastDestructiveRef={cancelRef}
              onClose={(): null => null}
            >
              <AlertDialogOverlay bg={"blackAlpha.900"}>
                <AlertDialogContent bg={"red.500"} rounded={25}>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    <VStack>
                      <Icon as={GoAlertFill} fontSize={"9xl"} />
                    </VStack>
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    <VStack spacing={0}>
                      <Text fontSize="lg" fontWeight={"bold"}>
                        Error {errorHandler.status} {errorHandler.reason}
                      </Text>
                      <Text fontSize="md">{errorHandler.message}</Text>
                    </VStack>
                  </AlertDialogBody>

                  <AlertDialogFooter justifyContent={"center"}>
                    <Button onClick={retryFetchData}>
                      Check your connection and try again
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </>
        ) : (
          <AbsoluteCenter>
            <Alert
              status="error"
              variant="top-accent"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height={240}
              rounded={15}
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize={["md", "md", "xl"]}>
                Network error
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                Your connection to the network is interrupted. Please check your
                connection
              </AlertDescription>
            </Alert>
          </AbsoluteCenter>
        )}
      </Box>
    </Box>
  );
}
