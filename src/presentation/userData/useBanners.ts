import { useQuery } from "@tanstack/react-query";
import { getBanners } from "../../core/database/userData/get-banners.action";

export const useBanners = (id?: string) => {
  const bannersQuery = useQuery({
    queryFn: () => getBanners(id!),
    queryKey: ["banners"],
    staleTime: 1000 * 60 * 60,
    enabled: !!id,
  });

  return { bannersQuery };
};
