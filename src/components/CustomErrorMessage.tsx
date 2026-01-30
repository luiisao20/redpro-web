import { type FormikTouched } from "formik";

interface Props {
  name: string;
  errors: any;
  touched: FormikTouched<any>;
}

export const CustomErrorMessage = ({ name, errors, touched }: Props) => {
  const error = errors[name];
  const isTouched = touched[name];

  if (!error || !isTouched) return null;

  return <p className="text-red-500 text-sm my-1 ml-2">{error}</p>;
};
