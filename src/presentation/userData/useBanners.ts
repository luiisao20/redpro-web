import { useQuery } from "@tanstack/react-query";
import { getBanners } from "../../core/database/userData/get-banners.action";

export const useBanners = (codeClient?: string) => {
  const bannersQuery = useQuery({
    queryFn: () => getBanners(codeClient!),
    queryKey: ["banners"],
    staleTime: 1000 * 60 * 60,
    enabled: !!codeClient,
  });

  return { bannersQuery };
};
