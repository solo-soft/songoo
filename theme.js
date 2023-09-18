import {extendTheme} from '@chakra-ui/react'


export const customTheme = extendTheme({
    styles: {
        global: {
            body: {
                background: 'black'
            },
            "::-webkit-scrollbar": {
                width: "6px",
                height: "6px",
            },
            "::-webkit-scrollbar-track": {
                bg: "transparent",
            },
            "::-webkit-scrollbar-thumb": {
                bg: "whiteAlpha.500",
                borderRadius: "full",
            },
            "::-webkit-scrollbar-thumb:hover": {
                bg: "gray.600",
            },
        },
    },


    background : {
        section : {
            suggest : {
                primary : "#181616",
                secondary : "#7886FF",
                tertiary : "#252525"
            },
            two : {
                primary: "#000000",
                secondary : "#D9D9D9"
            },
            three : {
                primary : "#6B1C39",
                secondary : "#410202"
            },

            likes : {
                primary : "#281414"
            },
            recently: {
                primary : "#131F0F"
            },
            playlists: {
                primary : "#181A33"
            },
            artist : {
                primary : "#000000",
                secondary : "#252525"
            },
            album : {
                primary : "#181616",
                secondary : "#252525"
            }
        },
    },


    font : {
        color : {
            section: {
                likes : {
                    primary : "#FFFFFF",
                    secondary : "#CC6868",
                    tertiary: "#6e6e6e",
                },
                recently : {
                    primary : "#FFFFFF",
                    secondary : "#629E4D",
                    tertiary: "#6e6e6e",
                },
                playlists : {
                    primary : "#FFFFFF",
                    secondary : "#7886FF",
                    tertiary: "#6e6e6e",
                    title : "#181616"
                },
                "playlist-songs" : {
                    primary : "#FFFFFF",
                    secondary : "#7886FF",
                    tertiary: "#6e6e6e",
                    title : "#181616"
                },
                artist : {
                    primary : "#FFFFFF",
                    secondary : "#7886FF",
                    tertiary: "#6e6e6e",
                    contrast : "#e7e7e7"
                },

            }
        }
    },

    icons : {
        color : {
            heart : "#B72828",
            history : "#629E4D",
            home : "#7886FF",
            dashboard : "#ff2f8f",
            playlists : "#548ba1",
            sun : "#FF993C",
        }
    },

    typo : {
        color : {
            primary : "#FFFFFF",
            secondary: "#D4D4D4",
            tertiary : "#252525"
        }
    },


})
