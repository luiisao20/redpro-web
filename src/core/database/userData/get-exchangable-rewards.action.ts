import { supabase } from "../../../../supabase";
import type { Product } from "../../../interfaces/interface";

export const getExchangeableProducts = async (
  limit = 5,
  offset = 0,
  codeClient: string,
  points: number,
  searchText: string,
  maxPoints: number,
) => {
  const products: Product[] = [];
  const { data, error } = await supabase
    .rpc("get_exchangeable_client_rewards", {
      max_points: maxPoints,
      code_client: codeClient,
      client_points: points,
      search_text: searchText,
    })
    .range(offset, offset + limit - 1);

  if (error) throw new Error(error.message);

  for (const element of data) {
    products.push({
      id: element.id,
      name: element.name,
      description: element.description,
      points: element.points,
      url: element.url,
      status: element.status,
    });
  }
  return products;
};
