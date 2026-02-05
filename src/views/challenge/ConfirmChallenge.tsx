import { useState, useEffect, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router";
import type { Challenge, UserData } from "../../interfaces/interface";
import { useChallenge } from "../../presentation/challenges/useChallenge";
import { useAuthStore } from "../../presentation/store/useAuthStore";
import { FiGift } from "react-icons/fi";
import { LuCalendar } from "react-icons/lu";
import { TbTargetArrow } from "react-icons/tb";
import { Colors } from "../../assets/colors";
import { formatDateLong } from "../../helpers/format-date-long";
import { RedProLogo } from "../../components/Icons";
import { Button, GoBackButton } from "../../components/Button";
import { useUser } from "../../presentation/user/useUser";

interface Item {
  icon: ReactNode;
  title?: string;
  data: string;
}

export const ConfirmChallenge = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const challengeId = parseInt(id!);

  const [challengeData, setChallengeData] = useState<Challenge>();
  const [userData, setUserData] = useState<UserData>();

  const { user } = useAuthStore();

  const { challengeQuery, challengeStatusMutation } = useChallenge(
    challengeId,
    user?.id,
  );
  const { userQuery } = useUser(user?.id);

  const items: Item[] = [
    {
      icon: <FiGift size={18} color={Colors.tabs} />,
      title: "Recompensa",
      data: `${challengeData?.points} Puntos`,
    },
    {
      icon: <LuCalendar size={18} color={Colors.tabs} />,
      title: "Disponible hasta",
      data: `${formatDateLong(challengeData?.endDate!)}`,
    },
    {
      icon: <TbTargetArrow size={18} color={Colors.tabs} />,
      title: "Nivel",
      data: "Fácil",
    },
  ];

  useEffect(() => {
    if (challengeQuery.data) setChallengeData(challengeQuery.data);
  }, [challengeQuery.data]);

  useEffect(() => {
    if (userQuery.data) setUserData(userQuery.data);
  }, [userQuery.data]);

  useEffect(() => {
    if (challengeStatusMutation.isSuccess)
      navigate(`/accepted/challenge/${challengeData?.id}`);
  }, [challengeStatusMutation.isSuccess]);

  const handleAccept = async () => {
    await challengeStatusMutation.mutateAsync({
      data: challengeData!,
      id: userData?.code!,
    });
  };

  return (
    <div className="flex flex-col">
      <GoBackButton onClick={() => navigate(-1)} />
      <div className="flex gap-6 items-center place-self-center mb-8">
        <RedProLogo />
        <h2 className="font-bold text-[2.5rem]">RedPro</h2>
      </div>
      <div className="px-6 flex flex-col gap-6">
        <h2 className="font-bold text-center">
          ¡Acepta el reto y suma puntos!
        </h2>
        <p className="text-center">
          Los retos Red Pro son la forma más divertida de avanzar: compra,
          acumula puntos y gana premios mientras haces crecer tu negocio.
        </p>
        <p className="text-center font-semibold">
          ¡Acepta el desafío y vive la experiencia Red Pro!{" "}
        </p>
        <div className="border border-green-700 rounded-2xl px-4 py-8 w-full flex flex-col gap-6">
          {items.map((item, index) => (
            <div key={index} className="flex flex-row gap-4">
              {item.icon}
              <p className="text-sm">
                <span className="font-semibold">{item.title}: </span>
                {item.data}
              </p>
            </div>
          ))}
        </div>
        <Button
          text="Comienza tu reto"
          onClick={handleAccept}
          loading={challengeStatusMutation.isPending}
        />
      </div>
    </div>
  );
};
