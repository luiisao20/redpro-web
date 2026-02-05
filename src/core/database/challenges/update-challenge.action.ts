import { supabase } from "../../../../supabase";
import type { Challenge } from "../../../interfaces/interface";

export const updateStatusChallenge = async (
  data: Challenge,
  userId: string,
) => {
  const { error } = await supabase
    .from("clients_challenges")
    .update({ is_accepted: true })
    .eq("challenge_id", data.id)
    .eq("store_id", userId);

  if (error) throw new Error(error.message);
};
