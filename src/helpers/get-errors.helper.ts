import * as Yup from "yup";

const regex = {
  name: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/,
  password: /^(?=.*\d)[a-zA-Z0-9]{6,}$/,
  cellphone: /^09\d{8}$/,
};

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Muy Corto!")
    .max(70, "Muy largo!")
    .matches(regex.name, "El nombre solo puede contener letras y espacios")
    .required("El campo no puede estar vacío"),

  code: Yup.string()
    .min(4, "Muy corto!")
    .matches(/\d$/, "El código sólo puede contener dígitos")
    .required("Debes ingresar el código otorgado"),

  password: Yup.string()
    .matches(regex.password, "La contraseña debe tener mínimo 6 caracteres y un número")
    .required("Debe ingresar una contraseña"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("Debe repetir su contraseña"),

  terms: Yup.boolean()
    .oneOf([true], "Debes aceptar los términos y condiciones para continuar")
    .required("Este campo es obligatorio"),
});
