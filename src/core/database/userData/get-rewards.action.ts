import { supabase } from "../../../../supabase";
import type { Product } from "../../../interfaces/interface";

export const getProducts = async (
  limit = 5,
  offset = 0,
  maxPoints: number,
  searchText?: string,
  code?: string,
): Promise<Product[]> => {
  const products: Product[] = [];

  const { data, error } = await supabase
    .rpc("get_client_rewards", {
      code_client: code,
      max_points: maxPoints,
      search_text: searchText ?? "",
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
