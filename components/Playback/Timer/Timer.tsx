import { HStack} from "@chakra-ui/react";
import { RangeSlider } from "./RangeSlider";
import { Duration } from "./Duration";
import { Elapsed } from "./Elapsed";

const Timer = ({playbackRef}) => {
  return (
    <HStack>
      <Duration/>
      <RangeSlider ref={playbackRef} />
      <Elapsed ref={playbackRef} />
    </HStack>
  );
};

export default Timer;
