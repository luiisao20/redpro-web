import { supabase } from "../../../../supabase";

export const decreaseClientPoints = async (
  userId: string,
  oldPoints: number,
  pointsToDecrease: number,
) => {
  const { error } = await supabase
    .from("clients")
    .update({ points: oldPoints - pointsToDecrease })
    .eq("id", userId);

  if (error) throw new Error(error.message);
};

export const increaseClientPoints = async (
  userId: string,
  oldPoints: number,
  pointsToIncrease: number,
) => {
  const { error } = await supabase
    .from("clients")
    .update({ points: oldPoints + pointsToIncrease })
    .eq("id", userId);

  if (error) throw new Error(error.message);
};
