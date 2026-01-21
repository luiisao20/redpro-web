import { Button, GoBackButton } from "../components/Button";
import { useNavigate } from "react-router";
import { InputComponent } from "../components/InputComponent";

export const LoginScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="relative grid place-items-center">
      <GoBackButton onClick={() => navigate(-1)} />
      <div className="mx-10 flex flex-col gap-5">
        <h2 className="text-4xl font-bold leading-10 ">
          Bienvenido. ¡Nos alegra verte de nuevo!
        </h2>
        <input
          type="text"
          className="bg-buttonLight border-buttonLight w-full text-4xl h-15 mx-10 border rounded-xl pl-4"
          placeholder="full-name@gmail.com"
        />
        <InputComponent />
        <a className="text-link place-self-end hover:underline hover:underline-offset-2 mb-5 cursor-pointer">
          ¿Olvidaste tu contraseña?
        </a>
        <Button text="Iniciar sesión" onClick={() => navigate("/dashboard/home")} />
      </div>
      <p className="text-center my-8">
        ¿No tienes cuenta?{" "}
        <a className="text-link font-bold hover:underline hover:underline-offset-2 cursor-pointer">
          Regístrate aquí
        </a>
      </p>
    </div>
  );
};
