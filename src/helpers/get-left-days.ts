export const getLeftDays = (sqlDate: string): number => {
  const baseDate = new Date(sqlDate);
  const today = new Date();

  baseDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diferenciaMs = baseDate.getTime() - today.getTime();
  const leftDays: number = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

  return leftDays;
};
