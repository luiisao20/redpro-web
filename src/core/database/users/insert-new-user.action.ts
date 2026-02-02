import { supabase } from "../../../../supabase";

export const insertNewUser = async (
  userId: string,
  code: string,
  name: string,
) => {
  const { error } = await supabase.from("clients").insert({
    id: userId,
    full_name: name,
    store_id: code,
  });

  if (error) throw new Error(error.message);
};
