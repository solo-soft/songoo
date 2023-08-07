import {supabase} from "../createClient";

export default async function getUserRecentlyPlayed (session) {
    try {
        const {data, error} = await supabase
            .from('UserRecentlyPlayed')
            .select('*').eq("userId", session.user.id)

        if (error || data === null) throw new Error()

        return data

    } catch (error) {
        throw new Error(`supabase reads UserVideoSaved is failed ! ${error}`)
    }
}
