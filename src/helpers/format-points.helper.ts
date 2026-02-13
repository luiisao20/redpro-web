export const formatWithWideSpace = (numero: number): string => {
  const formateador = new Intl.NumberFormat("es-ES");
  const resultadoBase = formateador.format(numero);

  const partes = resultadoBase.split(",");
  const conEspacios = partes[0].replace('.', "\u2003");

  return partes[1] ? `${conEspacios},${partes[1]}` : conEspacios;
};
