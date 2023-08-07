import {supabase} from "../createClient";

export default async function setUserRecentlyPlayed(songInfo) {
    try {

        const { data, error } = await supabase
            .from('UserRecentlyPlayed')
            .insert(songInfo)
            .select()

        if (error || data === null) {
            throw new Error()
        }

        return data

    } catch (error) {
        throw new Error(`supabase insert "UserRecentlyPlayed" is failed ! ${error}`)
    }
}
