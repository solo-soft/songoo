import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GoAlertFill } from "react-icons/go";
import { useRecoilState, useRecoilValue } from "recoil";
import { ERROR_INFO } from "../../recoil/atoms/atoms";
import { RefObject, useRef } from "react";
import { FocusableElement } from "@chakra-ui/utils";
import { useRouter } from "next/router";

const ErrorAlert = () => {
  const router = useRouter();
  const cancelRef: RefObject<FocusableElement> | any = useRef();
  const errorHandler = useRecoilValue(ERROR_INFO);
  return (
    <AlertDialog
      size={["xs", "sm", "md", "2xl"]}
      motionPreset="slideInRight"
      isCentered
      allowPinchZoom={true}
      autoFocus={false}
      closeOnOverlayClick={false}
      isOpen={errorHandler.isError}
      leastDestructiveRef={cancelRef}
      onClose={(): null => null}
    >
      <AlertDialogOverlay bg={"black"}>
        <AlertDialogContent bg={"#CD1818"} rounded={15}>
          <AlertDialogHeader>
            <VStack>
              <Icon as={GoAlertFill} fontSize={["8xl", "9xl"]} />
            </VStack>
          </AlertDialogHeader>

          <AlertDialogBody>
            <VStack spacing={0}>
              <Text fontSize="lg" fontWeight={"bold"}>
                Occurred error 😭
              </Text>
              <Text textAlign={"center"} fontSize="md">
                Something went wrong please check your connection
              </Text>
            </VStack>
          </AlertDialogBody>

          <AlertDialogFooter justifyContent={"center"}>
            <Button onClick={() => router.reload()}>Reload</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ErrorAlert;
