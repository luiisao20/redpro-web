import type { ButtonHTMLAttributes } from "react";
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
        className={`text-center font-regular text-xl ${variant === "default" || variant === "red" || variant === "orange" ? "text-white" : variant === "cancel" ? "text-link" : "text-text"}`}
      >
        {loading ? "Loading..." : text}
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
      className="hover:opacity-40 cursor-pointer place-self-start pl-10 py-8"
    >
      <IoArrowBackCircleOutline size={46} />
    </button>
  );
};
