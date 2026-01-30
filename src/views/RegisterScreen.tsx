import { Formik } from "formik";
import { useNavigate } from "react-router";
import { Button, GoBackButton } from "../components/Button";
import { InputComponent } from "../components/InputComponent";
import type { NewUser } from "../interfaces/interface";
import { useAuthStore } from "../presentation/core/useAuthStore";
import { registerSchema } from "../helpers/get-errors.helper";
import { useUser } from "../presentation/user/useUser";
import { CustomErrorMessage } from "../components/CustomErrorMessage";

export const RegisterScreen = () => {
  const navigate = useNavigate();

  const { user, register } = useAuthStore();

  const { userMutation } = useUser(user?.id);

  const newUser: NewUser = {
    cellphone: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    code: "",
  };

  return (
    <div className="relative min-h-screen grid place-items-center">
      <GoBackButton onClick={() => navigate(-1)} />
      <div className="mx-10 flex flex-col gap-5">
        <h2 className="text-3xl font-bold leading-10 ">
          ¡Hola! Regístrate para empezar
        </h2>
        <Formik
          initialValues={newUser}
          validationSchema={registerSchema}
          onSubmit={async (formLike, { setSubmitting }) => {
            await register(formLike);
            try {
              await userMutation.mutateAsync({
                cellphone: formLike.cellphone,
                code: formLike.code,
                name: formLike.name,
              });
              navigate("/dashboard/home");
            } catch (error) {
              console.log(error);
            }
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,

            handleSubmit,
            handleChange,
            handleBlur,
          }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                className="bg-buttonLight border-buttonLight w-full text-4xl h-15 mx-10 border rounded-xl pl-4"
                placeholder="Nombres"
                value={values.name}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                id="name"
                name="name"
              />
              <CustomErrorMessage
                name="name"
                errors={errors}
                touched={touched}
              />
              <input
                type="text"
                className="bg-buttonLight border-buttonLight w-full text-4xl h-15 mx-10 border rounded-xl pl-4"
                placeholder="Código de cliente"
                value={values.code}
                onChange={handleChange("code")}
                onBlur={handleBlur("code")}
                id="code"
                name="code"
              />
              <CustomErrorMessage
                name="code"
                errors={errors}
                touched={touched}
              />
              <input
                type="text"
                className="bg-buttonLight border-buttonLight w-full text-4xl h-15 mx-10 border rounded-xl pl-4"
                placeholder="Correo electrónico"
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                id="email"
                name="email"
              />
              <CustomErrorMessage
                name="email"
                errors={errors}
                touched={touched}
              />
              <input
                type="text"
                className="bg-buttonLight border-buttonLight w-full text-4xl h-15 mx-10 border rounded-xl pl-4"
                placeholder="Celular"
                value={values.cellphone}
                onChange={handleChange("cellphone")}
                onBlur={handleBlur("cellphone")}
                id="cellphone"
                name="cellphone"
              />
              <CustomErrorMessage
                name="cellphone"
                errors={errors}
                touched={touched}
              />
              <InputComponent
                placeholder="Contraseña"
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                id="password"
                name="password"
              />
              <CustomErrorMessage
                name="password"
                errors={errors}
                touched={touched}
              />
              <InputComponent
                placeholder="Confirmar contraseña"
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                id="confirmPassword"
                name="confirmPassword"
              />
              <CustomErrorMessage
                name="confirmPassword"
                errors={errors}
                touched={touched}
              />
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
              <Button type="submit" text="Continuar" disabled={isSubmitting} />
            </form>
          )}
        </Formik>
      </div>
      <p className="text-center my-6 text-sm">
        ¿Ya posees una cuenta?{" "}
        <a onClick={() => navigate('/login')} className="text-link font-bold hover:underline hover:underline-offset-2 cursor-pointer">
          Inicia sesión aquí
        </a>
      </p>
    </div>
  );
};
