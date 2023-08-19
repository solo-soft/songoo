import {extendTheme} from '@chakra-ui/react'
import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys)


const baseStyle = definePartsStyle({
    list: {
        // this will style the MenuList component
        p: '2',
        borderRadius: '15px',
        border: 'none',
    },
    item: {
        // this will style the MenuItem and MenuItemOption components
        bg : "none",
        borderRadius: '5px',
        my : "4px",

    },
    groupTitle: {
        // this will style the text defined by the title prop
        // in the MenuGroup and MenuOptionGroup components
        textTransform: 'uppercase',
        color: 'white',
        textAlign: 'center',
        letterSpacing: 'wider',
        opacity: '0.7',
    },
    command: {
        // this will style the text defined by the command
        // prop in the MenuItem and MenuItemOption components
        opacity: '0.8',
        fontFamily: 'mono',
        fontSize: 'sm',
        letterSpacing: 'tighter',
        pl: '4',
    },
    divider: {
        // this will style the MenuDivider component
        my: '1',
        borderBottom: '1px ',

    },
})

const xs = defineStyle({
    fontSize: 'xs',
    my: '.5',
})

const sm = defineStyle({
    fontSize: 'sm',
    my: '.5',
})

const md = defineStyle({
    fontSize: 'md',
    my: '1',
})

const lg = defineStyle({
    fontSize: 'lg',
    my: '1',
})

const xl = defineStyle({
    fontSize: 'lg',
    px: '4',
    py: '2',
})

const sizes = {
    // apply custom styles to parts
    xl: definePartsStyle({ button: xl, item: xl, groupTitle: lg, command: xl }),
    lg: definePartsStyle({ button: lg, item: lg, groupTitle: md, command: lg }),
    md: definePartsStyle({ button: md, item: md, groupTitle: sm, command: md }),
    sm: definePartsStyle({ button: sm, item: sm, groupTitle: xs, command: sm }),
    xs: definePartsStyle({ button: xs, item: xs, groupTitle: xs, command: xs }),
}

export const menuTheme = defineMultiStyleConfig({ baseStyle , sizes })




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

    components: {
        Menu: menuTheme,
    },

    default : {
        color : "#7886FF"
    },

    background : {
        section : {
            one : {
                primary : "#181616",
                secondary : "#252525"
            },
            two : {
                primary: "#000000",
                secondary : "#D9D9D9"
            },
            three : {
                primary : "#6B1C39",
                secondary : "#410202"
            }
        }
    },
    icons : {
        color : {
            heart : "#B72828",
            history : "#629E4D",
            saved : "#7886FF",
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


    breakpoints: {
        sm: "10em", //160px
        md: "53em", //848px
        lg: "67em", //1072px
        xl: "85em",//1360
        "2xl": "95em", //1520
        "3xl": "118em", //1880px
    },
})
