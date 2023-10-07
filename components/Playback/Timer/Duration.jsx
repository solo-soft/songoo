import useMilliseconds from "../../../hooks/useMilliseconds";
import { Text } from "@chakra-ui/react";
import {useRecoilValue} from "recoil";
import {PLAYBACK_DURATION} from "../../../recoil/atoms/atoms";

export const Duration = () => {
  const { milliseconds } = useMilliseconds();
  const duration = useRecoilValue(PLAYBACK_DURATION);
  return (
    <Text fontSize={"2xs"} fontWeight={"bold"}>
      {milliseconds(duration)}
    </Text>
  );
}
