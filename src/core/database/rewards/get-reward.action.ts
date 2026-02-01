import { supabase } from "../../../../supabase";
import type { Product } from "../../../interfaces/interface";

export const getReward = async (id: number): Promise<Product> => {
  const { data, error } = await supabase
    .from("rewards")
    .select()
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    points: data.points,
    url: data.image_url,
  };
};
