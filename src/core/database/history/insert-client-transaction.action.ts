import { supabase } from "../../../../supabase";
import type { TransactionHistory } from "../../../interfaces/interface";

export const insertClientTransaction = async (
  transaction: TransactionHistory,
  idClient: string,
) => {
  const { error } = await supabase.from("history").insert({
    client_id: idClient,
    reward_id: transaction.idReward ?? null,
    challenge_id: transaction.idChallenge ?? null,
  });

  if (error) throw new Error(error.message);
};
