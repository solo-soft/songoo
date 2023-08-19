import {Text} from "@chakra-ui/react";
import prettyMilliseconds from "pretty-ms";
import React from "react";


const Directions = ({duration}) => {
    return (
        <Text fontSize={"xs"}>{prettyMilliseconds(duration, {
                colonNotation: true,
                secondsDecimalDigits: 0
            }
        )}
        </Text>
    );
};

export default Directions;
