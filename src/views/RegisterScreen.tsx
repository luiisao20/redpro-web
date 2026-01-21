import { useNavigate } from "react-router";
import { Button, GoBackButton } from "../components/Button";
import { InputComponent } from "../components/InputComponent";

export const RegisterScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen grid place-items-center">
      <GoBackButton onClick={() => navigate(-1)} />
      <div className="mx-10 flex flex-col gap-5">
        <h2 className="text-4xl font-bold leading-10 ">
          ¡Hola! Regístrate para empezar
        </h2>
        <input
          type="text"
          className="bg-buttonLight border-buttonLight w-full text-4xl h-15 mx-10 border rounded-xl pl-4"
          placeholder="Nombres"
        />
        <input
          type="text"
          className="bg-buttonLight border-buttonLight w-full text-4xl h-15 mx-10 border rounded-xl pl-4"
          placeholder="Código de cliente"
        />
        <input
          type="text"
          className="bg-buttonLight border-buttonLight w-full text-4xl h-15 mx-10 border rounded-xl pl-4"
          placeholder="Correo electrónico"
        />
        <input
          type="text"
          className="bg-buttonLight border-buttonLight w-full text-4xl h-15 mx-10 border rounded-xl pl-4"
          placeholder="Celular"
        />
        <InputComponent placeholder="Contraseña" />
        <InputComponent placeholder="Confirmar contraseña" />
        <div className="flex gap-4 place-self-end">
          <input
            id="accept"
            name="accept"
            type="checkbox"
            className="bg-buttonDark text-buttonDark"
          />
          <label className="text-xs" htmlFor="accept">
            Aceptar términos y condiciones
          </label>
        </div>
        <Button text="Continuar" onClick={() => navigate("/dashboard/home")} />
      </div>
      <p className="text-center my-6">
        ¿No tienes cuenta?{" "}
        <a className="text-link font-bold hover:underline hover:underline-offset-2 cursor-pointer">
          Regístrate aquí
        </a>
      </p>
    </div>
  );
};
