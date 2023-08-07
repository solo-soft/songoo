import {supabase} from "../createClient";

export default async function setUserSubscriptions(singerInfo) {
    try {

        const { data, error } = await supabase
            .from('UserSubscriptions')
            .insert(singerInfo)
            .select()

        if (error || data === null) {
            throw new Error()
        }

        return data

    } catch (error) {
        throw new Error(`supabase insert "UserSubscriptions" is failed ! ${error}`)
    }
}
