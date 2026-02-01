import type { ButtonHTMLAttributes } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoArrowBackCircleOutline } from "react-icons/io5";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "light" | "cancel" | "white" | "red" | "orange";
  text: string;
  btnClass?: string;
  loading?: boolean;
}

export const Button = ({
  variant = "default",
  text,
  btnClass,
  loading,
  ...rest
}: Props) => {
  const variantClass =
    variant === "light"
      ? "border border-text bg-buttonLight active:bg-buttonLight/60"
      : variant === "cancel"
        ? "border border-link bg-buttonLight active:opacity-60"
        : variant === "white"
          ? "bg-white active:opacity-60"
          : variant === "red"
            ? "bg-link active:bg-link/60"
            : variant === "orange"
              ? "bg-orange active:bg-orange/60"
              : "bg-buttonDark active:bg-buttonDark/60";

  return (
    <button
      className={`py-4 rounded-xl w-full cursor-pointer hover:opacity-60 ${variantClass} ${loading && "cursor-progress"}`}
      disabled={loading}
      {...rest}
    >
      <p
        className={`text-center font-regular text-base ${variant === "default" || variant === "red" || variant === "orange" ? "text-white" : variant === "cancel" ? "text-link" : "text-text"}`}
      >
        {loading ? "Cargando..." : text}
      </p>
    </button>
  );
};

export const GoBackButton = ({
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...rest}
      className="hover:opacity-40 cursor-pointer place-self-start pl-4 pt-4"
    >
      <IoArrowBackCircleOutline size={46} />
    </button>
  );
};

interface FilterProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant?: "default" | "black";
}

export const ButtonFilter = ({
  title,
  variant = "default",
  ...rest
}: FilterProps) => (
  <button
    {...rest}
    className={`px-4 py-2 rounded-2xl active:opacity-60 ${variant === "default" ? "bg-buttonLight" : "bg-buttonDark"}`}
  >
    <p className={`font-medium text-xs ${variant === "black" && "text-white"}`}>
      {title}
    </p>
  </button>
);

interface SubFilterProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export const ButtonSubFilter = ({ title, ...rest }: SubFilterProps) => (
  <button
    {...rest}
    className="bg-gray flex flex-row items-center px-2 py-1 gap-6 rounded-xl"
  >
    <p className="text-white text-sm font-regular">{title}</p>
    <IoIosCloseCircleOutline
      size={22}
      className="active:opacity-60"
      color="white"
    />
  </button>
);
