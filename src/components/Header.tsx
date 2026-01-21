import { MdOutlinePerson } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";

export const Header = () => {
  return (
    <div className="flex justify-between py-8 items-center">
      <div>
        <h2 className="text-gray text-base font-light">Bienvenido.</h2>
        <h2 className="font-semibold text-xl">Hola, Carlos</h2>
      </div>
      <div className="flex gap-4">
        <button className="rounded-full border-2 p-1 cursor-pointer hover:opacity-60">
          <MdOutlinePerson size={30} />
        </button>
        <button className="rounded-full border-2 p-1 cursor-pointer hover:opacity-60">
          <FaRegBell size={26} />
        </button>
      </div>
    </div>
  );
};
