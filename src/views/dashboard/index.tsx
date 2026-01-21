import { NavLink, Outlet } from "react-router";
import { IoHome } from "react-icons/io5";
import { LuTicket } from "react-icons/lu";
import { HiOutlineFire } from "react-icons/hi2";
import { PiShoppingCart } from "react-icons/pi";

export const DashboardIndex = () => {
  return (
    <div>
      <Outlet />
      <footer className="fixed flex justify-between px-10 bottom-0 left-0 z-20 w-full bg-buttonDark pt-6 pb-3">
        <NavLink
          to="/dashboard/home"
          className={({ isActive }) =>
            `text-dotStyle flex flex-col items-center space-y-3 ${isActive && "text-white"}`
          }
        >
          <IoHome size={25} />
          <p className="font-thin">Inicio</p>
        </NavLink>
        <NavLink
          to="/dashboard/challenges"
          className={({ isActive }) =>
            `text-dotStyle flex flex-col items-center space-y-3 ${isActive && "text-white"}`
          }
        >
          <HiOutlineFire size={25} />
          <p className="font-thin">Retos</p>
        </NavLink>

        <NavLink
          to="/dashboard/rewards"
          className={({ isActive }) =>
            `text-dotStyle flex flex-col items-center space-y-3 ${isActive && "text-white"}`
          }
        >
          <LuTicket size={25} />
          <p className="font-thin">Canjear</p>
        </NavLink>
        <NavLink
          to="/dashboard/shop"
          className={({ isActive }) =>
            `text-dotStyle flex flex-col items-center space-y-3 ${isActive && "text-white"}`
          }
        >
          <PiShoppingCart size={25} />
          <p className="font-thin">Comprar</p>
        </NavLink>
      </footer>
    </div>
  );
};
