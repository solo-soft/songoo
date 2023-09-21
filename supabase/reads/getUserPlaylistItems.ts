import {supabase} from "../createClient";

export default async function getUserPlaylistItems (Tabel , session , playlistsId) {
    try {
        const {data, error} = await supabase
            .from(Tabel)
            .select('*').eq("userId", session.user.id).eq("id" , playlistsId)

        if (error || data === null) throw new Error()
        return data

    } catch (error) {
        throw new Error(`supabase reads ${Tabel} is failed ! ${error}`)
    }
}
