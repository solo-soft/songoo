import {atom, RecoilState} from "recoil";
import getIdArtistByName from "../../graphQl/query/schema/getIdArtistByName";
import {randomSingerUS} from "../../utils/randomBestArtists"
import {TCurrentSinger} from "./Type";


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



//?For the user panel of the subscription section

export const CURRENT_SINGER : RecoilState<TCurrentSinger | {}> = atom({
    key : Math.random().toString(),
    default : {}
})

//?Send the selected data to the create playlist modal
export const SELECTED_THE_SONG_BY_USER = atom({
    key : Math.random().toString(),
    default : {}
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



export const PLAYBACK_INFORMATION = atom({
    key : Math.random().toString(),
    default : {
        indexOfSong : 0,
        bunchOfSongs : []
    }
})

export const PLAYBACK_INFORMATION_NEW = atom({
    key : Math.random().toString(),
    default : {
        arrayOfSongs : [],
        indexOfSongs : 0,
        idsOfSongs : undefined,
        elapsedTime : 0,
        isPlaying : false,
        audioRef : undefined
    }
})

export const PLAYBACK_DYNAMIC_INDEX = atom({
    key : Math.random().toString(),
    default : 0
})



export const IS_OPEN_MODAL_CREATE_PLAYLIST = atom({
    key : Math.random().toString(),
    default : false
})





