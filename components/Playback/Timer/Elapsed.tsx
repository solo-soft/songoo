import React from "react";
import useMilliseconds from "../../../hooks/useMilliseconds";
import { Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { PLAYBACK_ELAPSED_TIME } from "../../../recoil/atoms/atoms";

export const Elapsed = React.forwardRef((props, ref) => {
  const { milliseconds } = useMilliseconds();
  const [elapsedTime, setElapsedTime] = useRecoilState(PLAYBACK_ELAPSED_TIME);
  return (
    <Text fontSize={"2xs"} fontWeight={"bold"}>
      {milliseconds((ref?.current?.duration - elapsedTime) * 1000)}
    </Text>
  );
});
