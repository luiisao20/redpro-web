import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getChallenge } from "../../core/database/challenges/get-challenge.action";
import type { Challenge } from "../../interfaces/interface";
import { updateStatusChallenge } from "../../core/database/challenges/update-challenge.action";

export const useChallenge = (id: number, userId?: string) => {
  const queryClient = useQueryClient();
  const challengeQuery = useQuery({
    queryFn: () => getChallenge(id, userId!),
    queryKey: ["challenge", id],
    staleTime: 1000 * 60 * 60,
    enabled: !!userId,
  });

  const challengeStatusMutation = useMutation({
    mutationFn: ({ data, id }: { data: Challenge; id: string }) =>
      updateStatusChallenge(data, id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["challenge", id],
      });
    },

    onError: (error) => {
      console.log(error);
    },
  });

  return { challengeQuery, challengeStatusMutation };
};
