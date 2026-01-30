import { supabase } from "../../../../supabase";

export const updateProduct = async (idClient: string, idProduct: number) => {
  const { error } = await supabase
    .from("clients_rewards")
    .update({ is_claimed: true })
    .eq("client_id", idClient)
    .eq("reward_id", idProduct);

  if (error) throw new Error(error.message);
};
