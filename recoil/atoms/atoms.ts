import {atom, RecoilState} from "recoil";
import getIdArtistByName from "../../graphQl/query/schema/getIdArtistByName";
import {randomSingerUS} from "../../utils/randomBestArtists"


export const SPOTIFY_TRACKS_ID_ATOM = atom({
    key: Math.random().toString(),
    default: undefined
})


export const SELECT_GENRE = atom({
    key: Math.random().toString(),
    default: 'pop'
})

export const HAMBURGER_MENU = atom({
    key: Math.random().toString(),
    default: false
})

export const PICK_ARTISTS = atom({
    key: Math.random().toString(),
    default: []
})


export const ARTISTS_ID = atom({
    key: Math.random().toString(),
    default: undefined
})

export const ARTISTS_NAME = atom({
    key: Math.random().toString(),
    default: undefined
})

export const FEELS = atom({
    key: Math.random().toString(),
    default: "Pop"
})

export const STATUS = atom({
    key: Math.random().toString(),
    default: "idle"
})

export const YOUTUBE_SINGER = atom({
    key: Math.random().toString(),
    default: undefined
})



type saveList = Array<{
    videoId: string
    title: string
    thumbnails: Array<{
        url: string
    }>
}>


export const YOUTUBE_SAVE_LIST: RecoilState<[] | saveList> = atom<[] | saveList>({
    key: Math.random().toString(),
    default: []
})


export const CONTROL_PLAYBACK = atom({
    key : Math.random().toString(),
    default : {
        index : 0,
        list : []
    }
})

export const IS_PLAYING = atom({
    key : Math.random().toString(),
    default : false
})

export const TIME_LEFT = atom({
    key : Math.random().toString(),
    default : 0
})

export const PLAYBACK_REF = atom({
    key : Math.random().toString(),
    default : undefined
})

export const CURRENT_SELECTED_MUSIC_ID = atom({
    key : Math.random().toString(),
    default : undefined
})




