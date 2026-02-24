export const formatDateLong = (fecha: string): string => {
  const date = new Date(fecha);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  };

  return date.toLocaleDateString("es-ES", options).replace(" de ", " de ");
};

const opciones: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
  hour12: false,
};

export const getFormattedDate = (date: string): string | null => {
  const fecha = new Date(date);
  return isNaN(fecha.getTime())
    ? null
    : fecha.toLocaleString("es-ES", opciones);
};
