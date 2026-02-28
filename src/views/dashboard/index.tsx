import { NavLink, Outlet } from "react-router";
import { IoHome } from "react-icons/io5";
import { LuTicket } from "react-icons/lu";
import { HiOutlineFire } from "react-icons/hi2";
import { PiShoppingCart } from "react-icons/pi";

export const DashboardIndex = () => {
  return (
    <div>
      <Outlet />
      <footer className="fixed flex justify-between px-6 bottom-0 left-0 z-20 w-full bg-buttonDark pt-4 pb-2">
        <NavLink
          to="/dashboard/home"
          className={({ isActive }) =>
            `text-dotStyle flex flex-col items-center space-y-2 ${isActive && "text-white"}`
          }
        >
          <IoHome size={22} />
          <p className="font-thin text-xs">Inicio</p>
        </NavLink>
        <NavLink
          to="/dashboard/challenges"
          className={({ isActive }) =>
            `text-dotStyle flex flex-col items-center space-y-2 ${isActive && "text-white"}`
          }
        >
          <HiOutlineFire size={22} />
          <p className="font-thin text-xs">Retos</p>
        </NavLink>

        <NavLink
          to="/dashboard/rewards"
          className={({ isActive }) =>
            `text-dotStyle flex flex-col items-center space-y-2 ${isActive && "text-white"}`
          }
        >
          <LuTicket size={22} />
          <p className="font-thin text-xs">Canjear</p>
        </NavLink>
        <a
          href="tel:+593980042037"
          className="text-dotStyle flex flex-col items-center space-y-2"
        >
          <PiShoppingCart size={22} />
          <p className="font-thin text-xs">Comprar</p>
        </a>
      </footer>
    </div>
  );
};
