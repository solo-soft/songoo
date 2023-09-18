import {atom, RecoilState, SetRecoilState} from "recoil";
import {TCurrentSinger} from "../../components/Dashboard/Panels/TopTracks/TTopTrack";

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


export const ARTISTS_ID : RecoilState<string | undefined> = atom<string | undefined>({
    key: Math.random().toString(),
    default: undefined
})

export const ARTISTS_NAME : RecoilState<string | undefined>  = atom<string | undefined>({
    key: Math.random().toString(),
    default: undefined
})

export const FEELS = atom({
    key: Math.random().toString(),
    default: "Pop"
})

export const STATUS: RecoilState<string> = atom<string>({
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

export const CURRENT_SINGER : RecoilState<TCurrentSinger> = atom<TCurrentSinger>({
    key : Math.random().toString(),
    default : {
        singerId : null,
        singerName : null
    }
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


type TPlayback = {
    arrayOfSongs : any[],
    indexOfSongs : number,
    idsOfSongs : undefined | string,
    elapsedTime :undefined | number,
    isPlaying : boolean,
    audioRef : HTMLAudioElement | null
}


export const PLAYBACK_INFORMATION : RecoilState<TPlayback> = atom<TPlayback>({
    key : Math.random().toString(),
    default : {
        arrayOfSongs : [],
        indexOfSongs : 0,
        idsOfSongs : undefined,
        elapsedTime : 0,
        isPlaying : false,
        audioRef : null
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


export const ERROR_INFO = atom({
    key : Math.random().toString(),
    default : {
        isError : false,
        retry : false,
        code: undefined,
        reason: undefined,
        message: undefined,
        status: undefined,
        swrMutate : () : void=> {}
    }
})




