import { useInfiniteQuery } from "@tanstack/react-query";
import { getNews } from "../../core/database/news/get-news.action";

export const useNews = (searchFilter?: string) => {
  const newsQuery = useInfiniteQuery({
    queryKey: ["news", searchFilter],
    queryFn: ({ pageParam }) => getNews(searchFilter, 8, pageParam * 8),
    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 8 ? allPages.length : undefined,
  });

  return {
    newsQuery,
    loadNextPage: newsQuery.fetchNextPage,
    nextPage: newsQuery.hasNextPage,
  };
};
