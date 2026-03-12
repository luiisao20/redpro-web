import { useInfiniteQuery } from "@tanstack/react-query";
import { getChallenges } from "../../core/database/userData/get-challenges.action";

export const useChallenges = (
  id?: string,
  searchFilter?: string,
  activeFilter?: string,
) => {
  const challengesQuery = useInfiniteQuery({
    queryKey: ["challenges", "infinite", searchFilter, activeFilter],
    queryFn: ({ pageParam }) =>
      getChallenges(
        5,
        pageParam * 5,
        id!,
        searchFilter !== "" ? searchFilter : undefined,
        activeFilter,
      ),
    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 5 ? allPages.length : undefined,
    enabled: !!id,
  });

  return {
    challengesQuery,

    loadNextPage: challengesQuery.fetchNextPage,
    nextPage: challengesQuery.hasNextPage,
  };
};
