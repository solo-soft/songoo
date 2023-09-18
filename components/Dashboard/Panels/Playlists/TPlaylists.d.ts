
export type TPlaylists = {
    create_at : string
    create_by : string
    description : string
    image_uploaded : string | null
    title : string | null
    id : string
    userId : string
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
    }[]
}
