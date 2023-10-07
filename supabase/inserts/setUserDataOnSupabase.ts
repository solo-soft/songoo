import {supabase} from "../SupabaseCreateClient";


export default async function setUserDataOnSupabase(Table : string, Information : {}) {
    try {
        const {data, error} = await supabase
            .from(Table)
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
