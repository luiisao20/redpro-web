import { GoVerified } from "react-icons/go";
import { Colors } from "../../assets/colors";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router";

export const AcceptChallenge = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center my-8 px-6">
      <GoVerified
        size={100}
        color={Colors.buttonDark}
        className="animate-heartbeat animate-duration-300 mb-8"
      />
      <h1 className="text-center font-semibold">¡Reto aceptado con éxito!</h1>
      <p className="text-center text-gray font-medium text-xl">
        Ya estás participando y sumando puntos Red Pro.
      </p>
      <p className="text-center text-gray font-medium text-xl mt-2 mb-8">
        Demuestra tu compromiso y sigue completando retos para alcanzar nuevas
        recompensas.
      </p>
      <Button
        text="Volver al inicio"
        onClick={() => navigate("/dashboard/home", { replace: true })}
      />
    </div>
  );
};
