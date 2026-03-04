import { useQuery } from "@tanstack/react-query";
import { getMacrochannelNumber } from "../../core/database/userData/get-macrochannel-number.action";

export const useMacrochannel = (userId?: string, id?: number) => {
  const macrochannelQuery = useQuery({
    queryFn: () => getMacrochannelNumber(id!),
    queryKey: ["macrochannel", userId],
    staleTime: 1000 * 60 * 60,
    enabled: !!id && !!userId,
  });

  return { macrochannelQuery };
};
