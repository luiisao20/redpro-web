import { supabase } from "../../../../supabase";

export const getCodeClientIfExsist = async (code: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from("clients_codes")
    .select("store_id")
    .eq("store_id", code)
    .eq("is_registered", true);

  if (error) throw new Error(error.message);

  if (data.length > 0) return true;
  return false;
};
