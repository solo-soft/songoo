import { Text } from "@chakra-ui/react";
import useMilliseconds from "../../hooks/useMilliseconds";
import { useRouter } from "next/router";
import {TCollection} from "../Collection/TCollection";

const Duration = ({ songs } : Partial<TCollection["song_info"]> ) => {
  const router = useRouter();
  const { milliseconds } = useMilliseconds();


  let fontSize;

  switch (router.pathname) {
    case "/dashboard":
      fontSize = ["2xs" , "xs" , "sm" , "2xs" , "xs"];
      break;
    default:
      if (router.pathname.includes("/collection")) {
        fontSize = ["xs", "xs", "sm"];
      }
  }

  return (
    <Text textAlign={"center"} fontSize={fontSize} flex={[.5 , .5 , .5]}>
      {milliseconds(songs.duration_ms)}
    </Text>
  );
};

export default Duration;
