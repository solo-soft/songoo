import { Text } from "@chakra-ui/react";
import useMilliseconds from "../../hooks/useMilliseconds";
import { useRouter } from "next/router";
import {TSongs} from "../TMainData";

const Duration = ({ songs } : {songs : Partial<TSongs["tracks"][0]>}) => {
  const router = useRouter();
  const { milliseconds } = useMilliseconds();

  let fontSize;

  switch (router.pathname) {
    case "/dashboard":
      fontSize = ["2xs" , "xs" , "sm" , "2xs" , "xs"];
      break;
    default:
      if (router.pathname.includes("/collection")) {
        fontSize = ["xs", "xs", "xl"];
      }
  }

  return (
    <Text fontSize={fontSize}>
      {milliseconds(songs.duration_ms)}
    </Text>
  );
};

export default Duration;
