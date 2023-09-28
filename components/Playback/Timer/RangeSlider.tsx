import React from "react";
import {getTrackBackground, Range} from "react-range";
import {useRecoilState} from "recoil";
import {PLAYBACK_ELAPSED_TIME} from "../../../recoil/atoms/atoms";
import useMilliseconds from "../../../hooks/useMilliseconds";

export const RangeSlider = React.forwardRef((props, ref : any) => {

    const [elapsedTime, setElapsedTime] = useRecoilState(PLAYBACK_ELAPSED_TIME);

    const handleTimeChange = (e) => {
        const time = e[0];
        setElapsedTime(time)
        ref.current.currentTime = time;
    };


    return (
        <Range
            min={0}
            max={ref?.current?.duration}
            values={[elapsedTime]}
            onChange={handleTimeChange}
            renderTrack={({ props, children }) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        height: "3px",
                        width: "100%",
                        background: getTrackBackground({
                            values: [elapsedTime],
                            colors: ["#7885FF", "#292E5C"],
                            min: 0,
                            max: ref?.current?.duration || 30,
                        }),
                    }}
                >
                    {children}
                </div>
            )}
            renderThumb={({ props }) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        display: "none",
                    }}
                />
            )}
        />
    )
})
