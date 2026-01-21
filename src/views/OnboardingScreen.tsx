import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { RedProLogo } from "../components/Icons";

export const OnboardingScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-16 mx-16">
      <div className="flex gap-6">
        <RedProLogo />
        <h2 className="font-bold text-[3rem]">RedPro</h2>
      </div>
      <h2 className="font-semibold text-xl text-center">
        ¡Listo! Ya estás preparado para ganar.
      </h2>
      <p className="text-center leading-6">
        Ahora ya sabes cómo aprovechar al máximo RedPro Sigue participando,
        sumando puntos y disfrutando de tus premios
      </p>
      <Button text="Empieza ahora" onClick={() => navigate(-1)} />
    </div>
  );
};
