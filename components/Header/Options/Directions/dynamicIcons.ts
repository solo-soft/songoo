import {AiFillHeart, AiFillHome, AiOutlineHistory} from "react-icons/ai";
import {BiSolidDashboard, BiSolidPlaylist} from "react-icons/bi";

export const dynamicIcons = () => {
    return [
        {
            name: "likes",
            icon: AiFillHeart,
            identity: "heart",
            direction: "/collection/likes",
        },
        {
            name: "Recently played",
            icon: AiOutlineHistory,
            identity: "history",
            direction: "/collection/recently-played",
        },
        {
            name: "Playlists",
            icon: BiSolidPlaylist,
            identity: "playlists",
            direction: "/collection/playlists/list",
        },
        {
            name: "dashboard",
            icon:  BiSolidDashboard,
            identity: "dashboard",
            direction:"/dashboard",
        },
    ];
};
