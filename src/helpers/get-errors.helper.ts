import * as Yup from "yup";

const regex = {
  name: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
  cellphone: /^09\d{8}$/,
};

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Muy Corto!")
    .max(70, "Muy largo!")
    .matches(regex.name, "El nombre solo puede contener letras y espacios")
    .required("El campo no puede estar vacío"),

  code: Yup.string()
    .matches(/\d$/, "El código sólo puede contener dígitos")
    .required("Debes ingresar el código otorgado"),

  cellphone: Yup.string().matches(
    regex.cellphone,
    "El número celular debe empezar con 09 y tener 10 dígitos"
  ),

  email: Yup.string()
    .email("El correo ingresado no es válido")
    .required("El correo es obligatorio"),

  password: Yup.string()
    .matches(
      regex.password,
      "La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un caracter especial !&%*@?+-_"
    )
    .required("Debe ingresar una contraseña"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("Debe repetir su contraseña"),
});
