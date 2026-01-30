interface Props {
  id?: string;
  points: number;
}

export const PointsComponent = ({ id, points }: Props) => {
  return (
    <div id={id} className="py-4 px-6 mx-6 bg-lightGreen rounded-t-2xl">
      <div className="flex justify-between items-center">
        <p className="text-[10px] text-buttonDark">Tus puntos disponibles</p>
        <p className="text-[10px] text-buttonDark">Mostrar transacciones</p>
      </div>
      <p className="text-buttonDark font-medium text-xl">
        <span className="font-bold">{points}</span> Puntos de bienvenida
      </p>
      <p className="text-xs text-buttonDark font-medium">
        Tus puntos vencen en 5 días
      </p>
    </div>
  );
};
