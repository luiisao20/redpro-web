import { supabase } from "../../../../supabase";
import type { UserData } from "../../../interfaces/interface";

export const getCurrentUser = async (userId: string): Promise<UserData> => {
  const { data, error } = await supabase
    .from("clients")
    .select()
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);

  const user: UserData = {
    cellphone: data.cellphone,
    code: data.store_id,
    name: data.full_name,
    points: data.points,
  };

  return user;
};
