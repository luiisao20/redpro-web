import { supabase } from "../../../../supabase";
import type { TransactionHistory } from "../../../interfaces/interface";

export const getClientHistory = async (
  idClient: string,
  filter: string,
): Promise<TransactionHistory[]> => {
  const transactions: TransactionHistory[] = [];

  const rpc =
    filter === "Canjeados"
      ? "get_client_history_rewards"
      : filter === "Obtenidos"
      ? "get_client_history_challenges"
      : "get_client_history";

  const { data, error } = await supabase.rpc(rpc, {
    id_client: idClient,
  });

  if (error) throw new Error(error.message);

  for (const element of data) {
    transactions.push({
      id: element.id,
      date: element.date,
      idChallenge: element.challenge_id,
      challengeName: element.challenge,
      challengePoints: element.challenge_points,
      challengeDescription: element.challenge_description,
      idReward: element.reward_id,
      rewardName: element.reward,
      rewardPoints: element.reward_points,
      rewardDescription: element.reward_description,
    });
  }

  return transactions;
};
