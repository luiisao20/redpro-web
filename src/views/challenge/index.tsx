import { useNavigate, useParams } from "react-router";
import { useAuthStore } from "../../presentation/store/useAuthStore";
import { useChallenge } from "../../presentation/challenges/useChallenge";
import { useEffect, useState } from "react";
import type { Challenge } from "../../interfaces/interface";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Button } from "../../components/Button";

export const ChallengeIndex = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const challengeId = parseInt(id!);

  const [challengeData, setChallengeData] = useState<Challenge>();

  const { user } = useAuthStore();

  const { challengeQuery } = useChallenge(challengeId, user?.id);

  useEffect(() => {
    if (challengeQuery.data) setChallengeData(challengeQuery.data);
  }, [challengeQuery.data]);

  return (
    <div className="mb-10">
      <div className="flex mx-6 items-center mt-3 gap-4">
        <IoArrowBackCircleOutline
          onClick={() => navigate(-1)}
          className="active:opacity-60"
          size={46}
        />
        <h2 className="text-[28px] font-semibold">Detalle del reto</h2>
      </div>
      <div className="px-6 mt-6 flex flex-col gap-4">
        <h2>{challengeData?.name}</h2>
        <img src={challengeData?.url} alt="" className="rounded-2xl" />
        <div>
          <p className="text-textGreen text-xl">
            <span className="font-semibold">
              {new Intl.NumberFormat("fr-FR").format(challengeData?.points!)}
            </span>{" "}
            Puntos
          </p>
          <p className="text-link">
            {challengeData?.leftDays! > 0
              ? `Te quedan ${challengeData?.leftDays} dias para completar este reto`
              : challengeData?.leftDays! < 0
                ? "Reto vencido"
                : "Último día del reto"}
          </p>
        </div>
        <h2 className="font-semibold">Mecánica</h2>
        <p className="font-thin text-sm text-justify">
          {challengeData?.description}
        </p>
        {(challengeData?.products ?? []).length > 0 && (
          <>
            <h2 className="font-semibold">Producto foco</h2>
            {challengeData?.products?.map((item) => (
              <div key={item.id}>
                <div className="border border-gray/60 flex items-center rounded-2xl">
                  <img src={item.url} alt="" className="h-30 w-30" />
                  <div>
                    <p className="font-semibold text-xs">{item.name}</p>
                    <p className="text-xs">
                      <span className="font-semibold">COD: </span>
                      {item.id}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        {challengeData?.isAccepted ? (
          <div>
            <h2 className="font-semibold">Tu avance</h2>
            <div className="flex flex-col gap-2 p-4 shadow-md/40 rounded-2xl">
              <label htmlFor="progress">Avance del reto</label>
              <div className="w-full bg-lightGreen rounded-full h-2">
                <div
                  className="bg-textGreen h-2 rounded-full"
                  style={{ width: `${challengeData.progress}%` }}
                ></div>
              </div>
              <p className="text-[10px] self-end">
                {challengeData.progress}% de 100%
              </p>
            </div>
          </div>
        ) : (
          challengeData?.leftDays! >= 0 && (
            <Button
              text="Aceptar el reto"
              onClick={() => {
                if (challengeData?.leftDays! >= 0)
                  navigate(`/confirm/challenge/${challengeData?.id}`);
              }}
            />
          )
        )}
      </div>
    </div>
  );
};
