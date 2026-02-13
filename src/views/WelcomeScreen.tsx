import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { RedProLogo } from "../components/Icons";

export const WelcomeScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center mx-6 gap-10">
      <div className="flex gap-6 items-center">
        <RedProLogo />
      </div>
      <Button
        text="Iniciar Sesión"
        onClick={() => navigate("/login", { replace: true })}
      />
      <Button
        text="Registrate aquí"
        variant="light"
        onClick={() => navigate("/welcome")}
      />
    </div>
  );
};
