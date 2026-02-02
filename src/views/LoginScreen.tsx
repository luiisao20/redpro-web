import { Button, GoBackButton } from "../components/Button";
import { useNavigate } from "react-router";
import { InputComponent } from "../components/InputComponent";
import { useState } from "react";
import { useAuthStore } from "../presentation/store/useAuthStore";

interface LoginData {
  code: string;
  password: string;
}

export const LoginScreen = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginData>({
    code: "",
    password: "",
  });

  const { login, loading } = useAuthStore();

  const handleLogin = async () => {
    if (loginData.code.trim() === "" || loginData.password.trim() === "") {
      alert("Los campos estan vacios");
      return;
    }

    const wasSuccessful = await login(loginData.code, loginData.password);

    if (wasSuccessful) return navigate("/dashboard/home");
  };

  return (
    <div className="relative grid place-items-center">
      <GoBackButton onClick={() => navigate(-1)} />
      <div className="mx-6 flex flex-col gap-5">
        <h2 className="text-3xl font-bold leading-10">
          Bienvenido. ¡Nos alegra verte de nuevo!
        </h2>
        <input
          type="number"
          className="bg-buttonLight border-buttonLight w-full text-2xl h-15 mx-10 border rounded-xl pl-4"
          placeholder="Código de cliente"
          onChange={(e) =>
            setLoginData((prev) => ({ ...prev, code: e.target.value }))
          }
        />
        <InputComponent
          autoCapitalize="none"
          placeholder="Contraseña"
          onChange={(e) =>
            setLoginData((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <a className="text-link text-sm place-self-end hover:underline hover:underline-offset-2 mb-3 cursor-pointer">
          ¿Olvidaste tu contraseña?
        </a>
        <Button
          text="Iniciar sesión"
          onClick={handleLogin}
          loading={loading}
        />
      </div>
      <p className="text-center my-8 text-sm">
        ¿No tienes cuenta?{" "}
        <a
          onClick={() => navigate("/register")}
          className="text-link font-bold hover:underline hover:underline-offset-2 cursor-pointer"
        >
          Regístrate aquí
        </a>
      </p>
    </div>
  );
};
