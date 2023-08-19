type TCommonTypes = {
    id : string
    userId : string
    created_at : string,
}


export type TRecentlyPlayed = TCommonTypes &{
    recently_played : Array<{
        id : string
        name : string
        preview_url : string | null
        images : Array<{
            url : string
        }>
    }>
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

export type TUserPlaylists = TCommonTypes & {
    create_by : string
    description : string
    image_uploaded : string | null
    title : string | null
    song_info : Array<{
        id : string
        duration_ms : number
        name : string
        preview_url : string
        album :{
            id : string
            name : string
            images : Array<{
                url : string
            }>
        }
    }>
}
