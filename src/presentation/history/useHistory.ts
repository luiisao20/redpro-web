import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getClientHistory } from "../../core/database/history/get-client-history.action";
import type { TransactionHistory } from "../../interfaces/interface";
import { insertClientTransaction } from "../../core/database/history/insert-client-transaction.action";

export const useHistory = ({
  idClient,
  filter,
}: {
  idClient?: string;
  filter: string;
}) => {
  const queryClient = useQueryClient();
  const historyQuery = useQuery({
    queryFn: () => getClientHistory(idClient!, filter),
    queryKey: ["history", idClient, filter],
    staleTime: 1000 * 60 * 60,
    enabled: !!idClient,
  });

  const historyMutation = useMutation({
    mutationFn: (transaction: TransactionHistory) =>
      insertClientTransaction(transaction, idClient!),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["history", idClient],
      });
    },

    onError: (error) => {
      console.log(error);
    },
  });

  return { historyQuery, historyMutation };
};
