import { MdOutlinePerson } from "react-icons/md";
import type { UserData } from "../interfaces/interface";
import { useNavigate } from "react-router";

interface Props {
  user: UserData;
}

export const Header = ({ user }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="flex px-6 justify-between py-8 items-center">
      <div>
        <h2 className="text-gray text-sm font-light">Bienvenido.</h2>
        <h2 className="font-semibold text-base">Hola, {user.name}</h2>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => navigate("/profile")}
          className="rounded-full border-2 p-1 cursor-pointer hover:opacity-60"
        >
          <MdOutlinePerson size={30} />
        </button>
        {/* <button className="rounded-full border-2 py-1 px-2 cursor-pointer hover:opacity-60">
          <FaRegBell size={24} />
        </button> */}
      </div>
    </div>
  );
};
