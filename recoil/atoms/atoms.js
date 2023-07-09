import {atom} from "recoil";
import getIdArtistByName from "../../graphQl/query/schema/getIdArtistByName";
import {randomSingerUS} from "../../utils/randomBestArtists";


export const SPOTIFY_TRACKS_ID_ATOM = atom({
    key : Math.random().toString(),
    default : undefined
})


export const SELECT_GENRE = atom({
    key : Math.random().toString(),
    default : 'pop'
})

export const HAMBURGER_MENU = atom({
    key : Math.random().toString(),
    default : false
})

export const PICK_ARTISTS = atom({
    key : Math.random().toString(),
    default : []
})


export const ARTISTS_ID = atom({
    key : Math.random().toString(),
    default : undefined
})

export const ARTISTS_NAME = atom({
    key : Math.random().toString(),
    default : undefined
})
