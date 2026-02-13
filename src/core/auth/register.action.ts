import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../../../supabase";

export const registerAction = async (
  email: string,
  password: string,
  code: string,
): Promise<{ user: User; session: Session } | null> => {
  console.log(code);
  
  const { data: dataDb, error: errorDb } = await supabase
    .from("clients_codes")
    .select()
    .eq("store_id", code);

  if (errorDb) {
    throw new Error(`Ha ocurrido un error inesperado: ${errorDb.message}`);
  }

  if (dataDb.length === 0) {
    throw new Error("¡El código de cliente está incorrecto!");
  }

  email = email.toLowerCase();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  const session: Session | null = data.session;
  const user: User | null = data.user;

  if (error || !session || !user) {
    throw new Error(error?.message);
  }

  return { user, session };
};
