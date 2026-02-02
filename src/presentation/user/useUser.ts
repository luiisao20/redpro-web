import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { insertNewUser } from "../../core/database/users/insert-new-user.action";
import { getCurrentUser } from "../../core/database/users/get-current-user.action";
import { decreaseClientPoints } from "../../core/database/users/update-client-points.action";

interface UserMutation {
  name: string;
  code: string;
}

export const useUser = (userId?: string) => {
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryFn: () => getCurrentUser(userId!),
    queryKey: ["user", userId],
    staleTime: 1000 * 60 * 60,
    enabled: !!userId,
  });

  const userMutation = useMutation({
    mutationFn: ({ name, code }: UserMutation) =>
      insertNewUser(userId!, code, name),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", userId],
      });
    },

    onError: (error) => {
      console.log(error);
    },
  });

  const userPointsMutation = useMutation({
    mutationFn: ({
      oldPoints,
      pointsToDecrease,
    }: {
      oldPoints: number;
      pointsToDecrease: number;
    }) => decreaseClientPoints(userId!, oldPoints, pointsToDecrease),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
    },

    onError: (error) => {
      console.log(error);
    },
  });

  return { userQuery, userMutation, userPointsMutation };
};
