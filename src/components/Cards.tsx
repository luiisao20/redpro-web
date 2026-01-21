import type { Banner, Challenge, Product } from "../interfaces/interface";
import { FaCheck, FaLock } from "react-icons/fa";

interface BannerComponent {
  item: Banner;
}

export const BannerCard = ({ item }: BannerComponent) => {
  return (
    <div key={item.id} className="min-w-full mr-4">
      <img
        src={item.url}
        alt={item.title}
        className="w-full h-40 object-cover rounded-xl shadow-md"
      />
    </div>
  );
};

interface ChallengeComponent {
  item: Challenge;
}

export const ChallengeCard = ({ item }: ChallengeComponent) => {
  return (
    <div key={item.id} className="shadow-md min-w-64 rounded-xl mr-4">
      <div className="p-4 flex flex-col space-y-2">
        <h2 className="font-semibold">{item.name}</h2>
        <p className="font-thin text-gray">{item.description}</p>
        <div className="flex gap-3 items-end">
          <p className="text-buttonDark font-regular border border-gray text-sm px-2 rounded-xl">
            {item.points} Puntos
          </p>
          <p className="text-xs text-red-500">Te quedan {item.leftDays} dias</p>
        </div>
      </div>
      <img src={item.url} alt="" className="w-full h-40 rounded-b-xl" />
    </div>
  );
};

interface RewardComponent {
  item: Product;
  half?: boolean;
  canRedeem?: boolean;
  disabledGo?: boolean;
}

export const RewardCard = ({
  item,
  half,
  canRedeem,
  disabledGo,
}: RewardComponent) => {
  const { id, url, name, points } = item;
  return (
    <div className="bg-background rounded-2xl mr-4 shadow-md min-w-40">
      <img
        src={url}
        alt={name}
        className="w-full h-22.5 object-contain rounded-t-2xl"
        loading="lazy"
      />

      <div className="p-2 flex flex-col items-center gap-2">
        <h3
          title={name}
          className="text-sm font-semibold text-center capitalize truncate w-full"
        >
          {name}
        </h3>

        {half ? (
          <div className="flex items-center px-2 text-sm">
            {canRedeem ? (
              <FaCheck className="text-tabs" />
            ) : (
              <FaLock className="text-gray" />
            )}
            <span className="ml-2 text-sm">
              {canRedeem
                ? "Ya puedes canjear este premio"
                : "Te faltan puntos para este canje"}
            </span>
          </div>
        ) : (
          <span className="text-xs">Canjea ahora por</span>
        )}

        <p className="text-pointsGreen text-sm truncate">
          <span className="font-bold">{points}</span> puntos
        </p>

        <button
          disabled={!canRedeem || disabledGo}
          onClick={() => {}}
          className={`px-4 py-2 rounded-md text-white text-center transition-colors
            ${
              !canRedeem || disabledGo
                ? "bg-gray cursor-not-allowed"
                : "bg-buttonDark hover:bg-buttonDark/80 active:bg-buttonDark/60"
            }
          `}
        >
          Canjea aquí
        </button>
      </div>
    </div>
  );
};
