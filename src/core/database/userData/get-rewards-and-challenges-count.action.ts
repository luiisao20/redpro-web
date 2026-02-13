import { supabase } from "../../../../supabase";
import type { ProfileInfo } from "../../../interfaces/interface";

export const getRewardsAndChallengesCount = async (
  userCode: string,
): Promise<ProfileInfo> => {
  const { data, error } = await supabase
    .from("clients_rewards")
    .select()
    .eq("store_id", userCode);

  if (error) throw new Error(error.message);

  const { data: challengeData, error: challengeError } = await supabase
    .from("clients_challenges")
    .select()
    .eq("store_id", userCode)
    .eq("is_completed", true);

  if (challengeError) throw new Error(challengeError.message);

  return {
    rewardCount: data.length,
    challengeCount: challengeData.length,
  };
};
