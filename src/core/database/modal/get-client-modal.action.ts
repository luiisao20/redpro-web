import { supabase } from "../../../../supabase";

export const getClientModal = async (id: string): Promise<String> => {
  const { data, error } = await supabase.rpc("get_client_modal", {
    id_client: id,
  });

  if (error) {
    console.log(error);
    
    throw new Error(error.message);}

  return data as string;
};
