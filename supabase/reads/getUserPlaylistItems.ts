import { supabase } from "../SupabaseCreateClient";

export default async function getUserPlaylistItems(
  Table: string,
  session: { user: { id: string } },
  playlistsId: string
) {
  try {
    const { data, error } = await supabase
      .from(Table)
      .select("*")
      .eq("userId", session.user.id)
      .eq("id", playlistsId);

    if (error || data === null) throw new Error();
    return data;
  } catch (error) {
    throw new Error(`supabase reads ${Table} is failed ! ${error}`);
  }
}
