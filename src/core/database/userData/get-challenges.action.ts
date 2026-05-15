import { supabase } from "../../../../supabase";
import { getLeftDays } from "../../../helpers/get-left-days";
import type { Challenge } from "../../../interfaces/interface";

export const getChallenges = async (
  limit = 5,
  offset = 0,
  id: string,
  searchFilter?: string,
  activeFilter?: string,
): Promise<Challenge[]> => {
  const active = activeFilter === "Activos" || activeFilter === "";
  const challenges: Challenge[] = [];
  const { data, error } = await supabase
    .rpc("get_clients_challenges_test", {
      id_client: id,
      search_text: searchFilter ?? "",
      filter_active: active
    })
    .range(offset, offset + limit - 1)
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);

  for (const element of data) {
    challenges.push({
      id: element.id,
      name: element.name,
      description: element.description,
      points: element.points,
      startDate: element.start_date,
      endDate: element.end_date,
      status: element.status,
      leftDays: getLeftDays(element.end_date),
      type: element.type,
      url: element.url,
    });
  }

  return challenges;
};
