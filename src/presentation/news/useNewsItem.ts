import { useQuery } from "@tanstack/react-query";
import { getNewsItem } from "../../core/database/news/get-news-item.action";

export const useNewsItem = (id: number) => {
  const newsItemQuery = useQuery({
    queryKey: ["newsItem", id],
    queryFn: () => getNewsItem(id),
    staleTime: 1000 * 60 * 60,
  });

  return { newsItemQuery };
};
