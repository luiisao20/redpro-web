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
    points: 250,
  });

  const { error: errorCode } = await supabase
    .from("clients_codes")
    .update({ is_registered: true })
    .eq("store_id", code);

  if (error || errorCode)
    throw new Error(error ? error.message : errorCode?.message);
};
