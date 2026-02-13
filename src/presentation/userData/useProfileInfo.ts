import { useQuery } from "@tanstack/react-query";
import { getRewardsAndChallengesCount } from "../../core/database/userData/get-rewards-and-challenges-count.action";

export const useProfileInfo = (codeClient?: string) => {
  const profileQuery = useQuery({
    queryKey: ["profile", codeClient],
    queryFn: () => getRewardsAndChallengesCount(codeClient!),
    enabled: !!codeClient,
    staleTime: 1000 * 60 * 60,
  });

  return { profileQuery };
};
