import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getReward } from "../../core/database/rewards/get-reward.action";
import { updateReward } from "../../core/database/rewards/update-reward.action";

export const useReward = (id: number) => {
  const queryClient = useQueryClient();
  const rewardQuery = useQuery({
    queryFn: () => getReward(id),
    queryKey: ["product", id],
    staleTime: 1000 * 60 * 60,
  });

  const rewardMutation = useMutation({
    mutationFn: ({
      codeClient,
      rewardId,
    }: {
      codeClient: string;
      rewardId: number;
    }) => updateReward(codeClient, rewardId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", "infinite"],
      });

      queryClient.invalidateQueries({
        queryKey: ["product", id],
      });
    },

    onError: (error) => {
      alert(error.message);
    },
  });

  return { rewardMutation, rewardQuery };
};
