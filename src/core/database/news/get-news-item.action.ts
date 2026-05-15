import { supabase } from "../../../../supabase";
import type { News } from "../../../interfaces/interface";

export const getNewsItem = async (id: number): Promise<News> => {
  const { data, error } = await supabase
    .from("news")
    .select()
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    image: data.url,
  };
};
