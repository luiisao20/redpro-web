import { supabase } from "../../../../supabase";

export const updateSeenModal = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("clients_have_modals")
    .update({ is_seen: true })
    .eq("store_id", id);

  if (error) throw new Error(error.message);
};
