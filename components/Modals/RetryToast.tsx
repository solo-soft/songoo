import { Alert, Text } from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";
import { useRecoilState, useRecoilValue } from "recoil";
import { ERROR_INFO } from "../../recoil/atoms/atoms";

const RetryToast = () => {
  const errorHandler = useRecoilValue(ERROR_INFO);
  return errorHandler.retry ? (
    <Alert
      status="warning"
      variant={"solid"}
      w={"xs"}
      position={"fixed"}
      bottom={4}
      left={15}
      rounded={25}
      zIndex={9999}
    >
      <ClipLoader size={25} />
      <Text mx={2} fontWeight={"bold"}>
        Retrying please with...
      </Text>
    </Alert>
  ) : null;
};

export default RetryToast;
