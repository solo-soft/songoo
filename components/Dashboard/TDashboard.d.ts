import {TArtistInfo, TSongs} from "../TMainData";

type TCommonTypes = {
    id : string
    userId : string
    created_at : string,
}

type TActionsTypes = TCommonTypes &{
    create_by : string
    song_info : {
        id : string
        duration_ms : number
        name : string
        preview_url : string | null
        album :{
            id : string
            name : string
            images : Array<{
                url : string
            }> | []
        }
        artists : Array<{
            id : string
            name : string
        }>
    }
}




export type TRecentlyPlayed = TCommonTypes &{
    song_info : {
        id : string
        duration_ms : number
        name : string
        preview_url : string | null
        album :{
            id : string
            name : string
            images : Array<{
                url : string
            }> | []
        }
        artists : Array<{
            id : string
            name : string
        }>
    }
}

export type TSubscriptions = TCommonTypes &{
    email : string
    singer : {
        id : string
        name : string
        images : Array<{
            url : string
            width : number
            height : number
        }>
    }
}

export type TUserPlaylists = TActionsTypes & {
    image_uploaded? : string | null
    description? : string
    title? : string | null
    id : string
    duration_ms : number
    name : string
    preview_url : string | null
    album :{
        id : string
        name : string
        images : Array<{
            url : string
        }> | []
    }
    artists : Array<{
        id : string
        name : string
    }>
}

export type TPinned = TActionsTypes

