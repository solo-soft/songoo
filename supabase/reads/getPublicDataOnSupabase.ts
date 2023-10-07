import {supabase} from "../SupabaseCreateClient";
import httpStatus from "http-status";

export default async function getPublicDataOnSupabase(Table : string) {
    const { data, error, status, statusText, count } = await supabase
        .from(Table)
        .select("*")

    if (![200, 201, 204].includes(status)) {
        throw {
            code: error?.code,
            reason : error?.message,
            message: httpStatus[status],
            status
        }
    } else {
        return data;
    }
}
