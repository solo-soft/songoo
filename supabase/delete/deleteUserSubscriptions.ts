import {supabase} from "../createClient";

export default async function deleteUserSubscriptions(subscribed) : Promise<any> {

    try {
        const {data , error} = await supabase
            .from('UserSubscriptions')
            .delete()
            .eq('id', subscribed.id)


        if (error) throw new Error()
        return data

    } catch (error) {
        throw new Error(`supabase delete "UserSubscriptions" is failed ! ${error}`)
    }
}
