import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Button } from "../components/Button";

export const LoginScreen = () => {
  return (
    <div className="relative min-h-screen grid place-items-center">
      <IoArrowBackCircleOutline className="absolute left-6 top-6" size={46} />
      <div className="mx-10 flex flex-col gap-5">
        <h2 className="text-4xl font-bold leading-10 ">
          Bienvenido. ¡Nos alegra verte de nuevo!
        </h2>
        <input
          type="text"
          className="bg-buttonLight border-buttonLight w-full text-4xl h-15 mx-10 border rounded-xl pl-4"
          placeholder="full-name@gmail.com"
        />
        <input
          type="password"
          className="bg-buttonLight border-buttonLight w-full text-4xl h-15 mx-10 border rounded-xl pl-4"
          placeholder="****"
        />
        <a className="text-link place-self-end hover:underline hover:underline-offset-2 mb-5">
          ¿Olvidaste tu contraseña?
        </a>
        <Button text="Iniciar sesión" />
      </div>
      <p className="text-center absolute bottom-8">
        ¿No tienes cuenta?{" "}
        <a className="text-link font-bold">Regístrate aquí</a>
      </p>
    </div>
  );
};
