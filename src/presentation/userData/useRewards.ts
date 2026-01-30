import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { getProducts } from "../../core/database/userData/get-rewards.action";
import { getExchangeableProducts } from "../../core/database/userData/get-exchangable-rewards.action";
import { getNonExchangeableProducts } from "../../core/database/userData/get-non-exchangable-rewards.action";
import { updateProduct } from "../../core/database/userData/update-products.action";

export const useRewards = ({
  points,
  filter,
  id,
  searchText,
}: {
  filter: string;
  points?: number;
  id?: string;
  searchText?: string;
}) => {
  const queryClient = useQueryClient();
  const rewardsQuery = useInfiniteQuery({
    queryKey: ["products", "infinite", filter, searchText],
    queryFn: ({ pageParam }) =>
      filter === ""
        ? getProducts(
            8,
            pageParam * 8,
            id!,
            searchText !== "" ? searchText : undefined,
          )
        : filter === "Canjeables"
          ? getExchangeableProducts(8, pageParam * 8, id!, points!)
          : getNonExchangeableProducts(8, pageParam * 8, id!, points!),
    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,
    getNextPageParam: (_, allPages) => allPages.length,
    enabled: !!id,
  });

  const rewardsMutation = useMutation({
    mutationFn: (idProduct: number) => updateProduct(id!, idProduct),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", "infinite", filter],
      });
    },

    onError: (error) => {
      console.log(error);
    },
  });

  return {
    rewardsMutation,
    rewardsQuery,

    loadNextPage: rewardsQuery.fetchNextPage,
  };
};
