import { useState, type InputHTMLAttributes } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export const InputComponent = ({ ...rest }: Props) => {
  const [passwordType, setPasswordType] = useState(true);

  return (
    <div className="relative">
      <input
        {...rest}
        type={passwordType ? "password" : "text"}
        className="bg-buttonLight border-buttonLight w-full text-4xl h-15 mx-10 border rounded-xl pl-4"
      />
      <a onClick={() => setPasswordType((prev) => !prev)}>
        {passwordType ? (
          <HiEye className="absolute right-4 top-4 text-gray" size={30} />
        ) : (
          <HiEyeSlash className="absolute right-4 top-4 text-gray" size={30} />
        )}
      </a>
    </div>
  );
};
