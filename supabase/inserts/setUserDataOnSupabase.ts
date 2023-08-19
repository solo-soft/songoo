import {supabase} from "../createClient";

export default async function setUserDataOnSupabase(Tabel, Information) {
    try {
        const {data, error} = await supabase
            .from(Tabel)
            .insert(Information)
            .select()

        if (error || data === null) {
            console.log(error)
            throw new Error()
        }

        return data

    } catch (error) {
        throw new Error(`supabase insert  is failed ! ${error}`)
    }
}
