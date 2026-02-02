import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../../../supabase";

export const loginAction = async (
  code: string,
  password: string,
): Promise<{ user: User; session: Session } | null> => {
  const { data: dataDb, error: errorDb } = await supabase.rpc(
    "get_user_email",
    { code },
  );

  if (errorDb) {
    throw new Error(`Ocurrió un error inesperado: ${errorDb.message}`);
  }

  if (dataDb.length === 0) throw new Error("El código de cliente está incorrecto");

  const email = dataDb[0].email;

  const { data, error } = await supabase.auth.signInWithPassword({
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
