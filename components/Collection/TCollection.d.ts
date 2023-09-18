export type TCollection = {
    id : string
    userId : string
    created_at : string,
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
    } | Partial<TCollection["song_info"][]>
}
