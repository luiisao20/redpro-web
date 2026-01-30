import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { RedProLogo } from "../components/Icons";

export const WelcomeScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center mx-6 gap-10">
      <div className="flex gap-6 items-center">
        <RedProLogo />
        <h2 className="font-bold text-[2.5rem]">RedPro</h2>
      </div>
      <Button text="Iniciar Sesión" onClick={() => navigate("/login")} />
      <Button
        text="Registrate aquí"
        variant="light"
        onClick={() => navigate("/register")}
      />
    </div>
  );
};
