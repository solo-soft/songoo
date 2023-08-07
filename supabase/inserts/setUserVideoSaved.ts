import {supabase} from "../createClient";

export default async function setUserVideoSaved(value) {

    try {
        const {data, error} = await supabase.from("UserVideoSaved").insert(value).select("*")

        if (error || data === null) throw new Error()

        return data
    } catch (error) {
        throw new Error(`supabase insert "UserVideoSaved" is failed ! ${error}`)
    }

}
