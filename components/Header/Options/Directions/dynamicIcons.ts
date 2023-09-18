import {AiFillHeart, AiFillHome, AiOutlineHistory} from "react-icons/ai";
import {BiSolidDashboard, BiSolidPlaylist} from "react-icons/bi";

export const dynamicIcons = (pathname: string) => {
    const check = pathname === "/dashboard";
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
            name: check ? "home" : "dashboard",
            icon: check ? AiFillHome : BiSolidDashboard,
            identity: check ? "home" : "dashboard",
            direction: check ? "/" : "/dashboard",
        },
    ];
};
