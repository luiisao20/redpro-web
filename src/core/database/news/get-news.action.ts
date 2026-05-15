import { supabase } from "../../../../supabase";
import type { News } from "../../../interfaces/interface";

export const getNews = async (
  searchFilter?: string,
  limit = 8,
  offset = 5,
): Promise<News[]> => {
  const news: News[] = [];

  const { data, error } = await supabase
    .from("news")
    .select()
    .ilike("title", `%${searchFilter}%`)
    .range(offset, offset + limit - 1);

  if (error) throw new Error(error.message);

  for (const element of data) {
    news.push({
      id: element.id,
      title: element.title,
      description: element.description,
      image: element.url,
    });
  }

  return news;
};
