import {supabase} from "../createClient";

export default async function deleteUserSubscriptions(Tabel , Ids) : Promise<any> {

    try {
        const {data , error} = await supabase
            .from(Tabel)
            .delete()
            .eq('id', Ids)


        if (error) throw new Error()
        return data

    } catch (error) {
        throw new Error(`supabase delete "UserSubscriptions" is failed ! ${error}`)
    }
}
