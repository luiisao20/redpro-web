import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "../../core/database/userData/get-rewards.action";
import { getExchangeableProducts } from "../../core/database/userData/get-exchangable-rewards.action";
import { getNonExchangeableProducts } from "../../core/database/userData/get-non-exchangable-rewards.action";

export const useRewards = ({
  points,
  filter,
  codeClient,
  searchText,
  maxPoints,
}: {
  filter: string;
  points?: number;
  maxPoints?: number;
  codeClient?: string;
  searchText?: string;
}) => {
  const rewardsQuery = useInfiniteQuery({
    queryKey: ["products", "infinite", filter, searchText],
    queryFn: ({ pageParam }) =>
      filter === ""
        ? getProducts(
            8,
            pageParam * 8,
            maxPoints!,
            searchText !== "" ? searchText : undefined,
            codeClient!,
          )
        : filter === "Canjeables"
          ? getExchangeableProducts(
              8,
              pageParam * 8,
              codeClient!,
              points!,
              searchText!,
              maxPoints!,
            )
          : getNonExchangeableProducts(
              8,
              pageParam * 8,
              codeClient!,
              points!,
              searchText!,
              maxPoints!,
            ),
    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 8 ? allPages.length : undefined,
    enabled: !!maxPoints && !!codeClient,
  });

  return {
    rewardsQuery,

    loadNextPage: rewardsQuery.fetchNextPage,
    nextPage: rewardsQuery.hasNextPage,
  };
};
