import { supabase } from "../../../../supabase";

export const updateReward = async (codeClient: string, rewardId: number) => {
  const { error } = await supabase
    .from("clients_rewards")
    .insert({ is_claimed: true, reward_id: rewardId, store_id: codeClient });

  if (error) throw new Error(error.message);
};
