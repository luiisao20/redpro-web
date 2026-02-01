import { supabase } from "../../../../supabase";
import { getLeftDays } from "../../../helpers/get-left-days";
import type { Challenge } from "../../../interfaces/interface";

export const getChallenge = async (
  id: number,
  userId: string,
): Promise<Challenge> => {
  const { data, error } = await supabase.rpc("get_challenge_info", {
    id_challenge: id,
    id_client: userId,
  });

  if (error) throw new Error(error.message);

  return {
    id: data[0].id,
    name: data[0].name,
    description: data[0].description,
    points: data[0].points,
    startDate: data[0].start_date,
    endDate: data[0].due_date,
    url: data[0].url,
    status: data[0].status,
    leftDays: getLeftDays(data[0].due_date),
    type: data[0].type,
    isAccepted: data[0].is_accepted,
    products: data[0].products
      ? data[0].products.map((item: any) => ({
          id: item.id,
          name: item.name,
          url: item.url,
        }))
      : undefined,
  };
};
