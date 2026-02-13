import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";
import { useAuthStore } from "../../presentation/store/useAuthStore";
import { useReward } from "../../presentation/rewards/useReward";
import { useUser } from "../../presentation/user/useUser";
import { useEffect, useState } from "react";
import type { Product, TransactionHistory } from "../../interfaces/interface";
import { type UserData } from "../../interfaces/interface";
import { PointsComponent } from "../../components/PointsComponent";
import { Button } from "../../components/Button";
import { ModalsReward } from "../../components/ModalsReward";
import { useHistory } from "../../presentation/history/useHistory";

export const RewardIndex = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const rewardId = parseInt(id!);

  const [dataReward, setDataReward] = useState<Product>();
  const [userData, setUserData] = useState<UserData>();
  const [openModal, setOpenModal] = useState(false);

  const { user } = useAuthStore();

  const { rewardMutation, rewardQuery } = useReward(rewardId);
  const { userQuery, userPointsMutation } = useUser(user?.id);
  const { historyMutation } = useHistory({ idClient: user?.id, filter: "" });

  useEffect(() => {
    if (rewardQuery.data) setDataReward(rewardQuery.data);
  }, [rewardQuery.data]);

  useEffect(() => {
    if (userQuery.data) setUserData(userQuery.data);
  }, [userQuery.data]);

  const handleSendData = async () => {
    const transaction: TransactionHistory = {
      date: new Date().toISOString(),
      idReward: parseInt(`${id}`),
      rewardDescription: dataReward?.description,
      rewardName: dataReward?.name,
      rewardPoints: dataReward?.points,
    };

    await historyMutation.mutateAsync(transaction);

    await rewardMutation.mutateAsync({
      codeClient: userData?.code!,
      rewardId: dataReward?.id!,
    });

    await userPointsMutation.mutateAsync({
      oldPoints: userData?.points!,
      pointsToDecrease: dataReward?.points!,
    });
    navigate("/dashboard/home", { replace: true });
  };

  if (rewardQuery.isLoading) {
    return;
  }

  return (
    <>
      <div className="mb-10">
        <div className="flex ml-6 items-center mt-3 gap-4 mb-6">
          <IoArrowBackCircleOutline
            onClick={() => navigate(-1)}
            className="active:opacity-60"
            size={40}
          />
          <h2 className="text-[26px] font-semibold">Canjea tus puntos</h2>
        </div>
        <PointsComponent points={userData?.points!} id="points" />
        <div className="px-6 mt-4 flex flex-col gap-4">
          <h2>{dataReward?.name}</h2>
          <img
            src={dataReward?.url}
            alt=""
            className="rounded-2xl h-50 place-self-center"
          />
          <p className="font-thin text-sm text-justify">{dataReward?.description}</p>
          {userData?.points! >= dataReward?.points! ? (
            <div className="flex flex-col space-y-2">
              <p>Tienes los puntos requeridos para este canje.</p>
              <p>Puedes reclamarlo ahora mismo</p>
              <h2 className="font-semibold ml-2">Puntos requeridos</h2>
              <p className="font-semibold text-orange ml-2 border border-orange place-self-start px-6 py-2 rounded-xl shadow-md/40 mb-8">
                {new Intl.NumberFormat("fr-FR").format(dataReward?.points!)}{" "}
                puntos
              </p>
              <Button text="Canjea ahora" onClick={() => setOpenModal(true)} />
            </div>
          ) : (
            <h2 className="font-medium">
              No posees los puntos suficientes para canjear este producto
            </h2>
          )}
        </div>
      </div>
      <ModalsReward
        open={openModal}
        onFinish={handleSendData}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
};
