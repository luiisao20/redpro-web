import { supabase } from "../../../../supabase";
import type { Banner } from "../../../interfaces/interface";

export const getBanners = async (id: string): Promise<Banner[]> => {
  const banners: Banner[] = [];

  const { data, error } = await supabase.rpc("get_clients_banners", {
    code_client: id,
  });

  if (error) throw new Error(error.message);

  for (const element of data) {
    banners.push({
      id: element.id,
      title: element.title,
      url: element.url,
    });
  }

  return banners;
};
