import {supabase} from "../SupabaseCreateClient";

export default async function updateUserDataOnSupabase(Table : string, Information : {}, id : string) {
    try {
        const {data, error} = await supabase
            .from(Table)
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
