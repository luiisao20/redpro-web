import { useEffect, useState, type ReactNode } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdOutlinePerson } from "react-icons/md";
import { PiStarFour } from "react-icons/pi";
import { CgPassword } from "react-icons/cg";
import { TbTicket } from "react-icons/tb";
import { HiOutlineFire } from "react-icons/hi";
import { FaRegCommentDots } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

import type { UserData, ProfileInfo } from "../../interfaces/interface";
import { useUser } from "../../presentation/user/useUser";
import { useAuthStore } from "../../presentation/store/useAuthStore";
import { Button, GoBackButton } from "../../components/Button";
import { Colors } from "../../assets/colors";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useProfileInfo } from "../../presentation/userData/useProfileInfo";

interface Card {
  icon: string;
  title: string;
  data?: number;
  type: string;
}

export interface UserInfo {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  router?: string;
}

export const IndexProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [userData, setUserData] = useState<UserData>();
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>();
  const { user, logout } = useAuthStore();

  const { userQuery } = useUser(user?.id);
  const { profileQuery } = useProfileInfo(userData?.code);

  const cards: Card[] = [
    {
      icon: "⭐",
      title: "Puntos Actuales",
      data: userData?.points,
      type: "Puntos",
    },
    {
      icon: "🎯",
      title: "Retos Completados",
      data: profileInfo?.challengeCount,
      type: "Retos",
    },
    {
      icon: "🛍️",
      title: "Canjes Realizados",
      data: profileInfo?.rewardCount,
      type: "Canjes",
    },
  ];

  const mockUserInfo: UserInfo[] = [
    {
      icon: <MdOutlinePerson color={Colors.tabs} size={26} />,
      title: "Codigo de cliente",
      subtitle: `${userData?.code}`,
    },
    {
      icon: <PiStarFour color={Colors.tabs} size={26} />,
      title: "Puntos actuales",
      subtitle: `${userData?.points} Puntos`,
    },
    {
      icon: <CgPassword color={Colors.tabs} size={26} />,
      title: "Actualizar información",
    },
    {
      icon: <TbTicket color={Colors.tabs} size={26} />,
      title: "Historial de canjes",
      router: "transactions",
    },
    {
      icon: <HiOutlineFire color={Colors.tabs} size={26} />,
      title: "Retos completados",
      subtitle: "14",
    },
    {
      icon: <FaRegCommentDots color={Colors.tabs} size={26} />,
      title: "Preguntas frecuentes",
    },
  ];

  useEffect(() => {
    if (userQuery.data) setUserData(userQuery.data);
  }, [userQuery.data]);

  useEffect(() => {
    if (profileQuery.data) setProfileInfo(profileQuery.data);
  }, [profileQuery.data]);

  return (
    <div className="mb-8">
      <GoBackButton onClick={() => navigate(-1)} />
      <div className="flex flex-col justify-center items-center relative px-6 gap-4">
        <div className="flex flex-col items-center">
          <IoPersonCircleSharp size={100} color="#24514f" />
          <h2 className="font-semibold text-buttonDark text-xl">
            {userData?.name}
          </h2>
        </div>
        <div className="flex flex-row w-full items-center justify-between gap-2 py-4">
          {cards.map((item, index) => (
            <div
              key={index}
              className="bg-lightGreen justify-center flex flex-col items-center rounded-2xl px-2 py-4"
            >
              <p className="text-center">{item.icon}</p>
              <h2 className="text-center my-2 text-xs font-semibold">
                {item.title}
              </h2>
              <p className="text-center text-xs font-semibold">{item.data}</p>
              <p className="text-center text-xs">{item.type}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col w-full border border-textGreen rounded-2xl p-6 gap-4">
          {mockUserInfo.map((item, index) => (
            <a
              onClick={() => navigate(`${item.router}`)}
              key={index}
              className="flex flex-row justify-between items-center active:opacity-60 gap-6"
            >
              <div className="flex flex-row items-center gap-4">
                {item.icon}
                <h2 className="text-sm">{item.title}</h2>
              </div>
              <IoIosArrowForward className="place-self-end" size={26} />
            </a>
          ))}
        </div>
        <Button
          text="Cerrar sesión"
          variant="red"
          onClick={async () => {
            await logout();
            navigate("/");
            queryClient.invalidateQueries({
              queryKey: ["challenges"],
            });
            queryClient.invalidateQueries({
              queryKey: ["rewards"],
            });
            queryClient.invalidateQueries({
              queryKey: ["banners"],
            });
            queryClient.invalidateQueries({
              queryKey: ["user"],
            });
            queryClient.invalidateQueries({
              queryKey: ["history"],
            });
          }}
        />
      </div>
    </div>
  );
};
