import { supabase } from "../SupabaseCreateClient";
import httpStatus from "http-status";


type TSession = {
  "message": string,
  "user": {
    "email": string,
    "id": string,
    "iat": number,
    "exp": number
  }
}
export default async function getUserDataOnSupabase(Table : string, session : TSession) {
  const { data, error, status, statusText, count } = await supabase
    .from(Table)
    .select("*")
    .eq("userId", session.user.id);

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
