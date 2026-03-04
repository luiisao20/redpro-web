import { supabase } from "../../../../supabase";

export const getMacrochannelNumber = async (id: number): Promise<string> => {
  const { data, error } = await supabase
    .from("macrochannel")
    .select()
    .eq("id", id);

  if (error) throw new Error(error.message);

  return data[0].phone;
};
