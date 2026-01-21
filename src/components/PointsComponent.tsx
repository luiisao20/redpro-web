interface Props {
  id?: string;
}

export const PointsComponent = ({ id }: Props) => {
  return (
    <div id={id} className="py-4 px-6 bg-lightGreen rounded-t-2xl">
      <div className="flex justify-between">
        <p className="text-xs text-buttonDark">Tus puntos disponibles</p>
        <p className="text-xs text-buttonDark">Mostrar transacciones</p>
      </div>
      <p className="text-buttonDark font-medium text-xl">
        <span className="font-bold">500</span> Puntos de bienvenida
      </p>
      <p className="text-xs text-buttonDark font-medium">
        Tus puntos vencen en 5 días
      </p>
    </div>
  );
};
