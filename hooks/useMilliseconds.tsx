import React from 'react';
import prettyMilliseconds from "pretty-ms";

const useMilliseconds = () => {
    return {
        milliseconds : (duration = 0) => {
            return prettyMilliseconds(duration, {
                secondsDecimalDigits: 0,
                colonNotation: true,
            })
        }
    }
};

export default useMilliseconds;
