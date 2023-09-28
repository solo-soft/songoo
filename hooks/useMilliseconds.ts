import React from 'react';
import prettyMilliseconds from "pretty-ms";

const useMilliseconds = () => {
    return {
        milliseconds : (duration : number = 0) => {
            return prettyMilliseconds(duration || 0, {
                secondsDecimalDigits: 0,
                colonNotation: true,
            })
        }
    }
};

export default useMilliseconds;
