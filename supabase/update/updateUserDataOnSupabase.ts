import {supabase} from "../createClient";

export default async function updateUserDataOnSupabase(Tabel, Information , id) {

    console.log(Tabel)
    console.log(Information)

    try {
        const {data, error} = await supabase
            .from(Tabel)
            .update({"song_info" : Information})
            .eq("id" , id)
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
