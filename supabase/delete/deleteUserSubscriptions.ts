import {supabase} from "../SupabaseCreateClient";

export default async function deleteUserSubscriptions(Table : string , Ids : string) : Promise<any> {
    try {
        const {data , error} = await supabase
            .from(Table)
            .delete()
            .eq('id', Ids)
        if (error) throw new Error()
        return data

    } catch (error) {
        throw new Error(`supabase delete "UserSubscriptions" is failed ! ${error}`)
    }
}
