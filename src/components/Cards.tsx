import type { Banner, Challenge, News, Product } from "../interfaces/interface";
import { FaLock } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router";

interface BannerComponent {
  item: Banner;
}

export const BannerCard = ({ item }: BannerComponent) => {
  return (
    <div key={item.id} className="min-w-full">
      <img
        src={item.url}
        alt={item.title}
        className="h-36 w-full object-fill rounded-xl shadow-md"
      />
    </div>
  );
};

interface ChallengeComponent {
  item: Challenge;
  half?: boolean;
}

export const ChallengeCard = ({ item, half }: ChallengeComponent) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/challenge/${item.id}`)}
      key={item.id}
      className={`shadow-md/30 flex flex-col justify-between rounded-xl ${!half && "min-w-68 mr-4"} active:opacity-60 `}
    >
      <div
        className={`flex flex-col ${half ? "p-2 space-y-1" : "space-y-2 p-4"}`}
      >
        <h2 className="font-semibold">{item.name}</h2>
        <p
          className={`font-thin line-clamp-2 text-gray ${half && "text-[10px]"}`}
        >
          {item.description}
        </p>
        <div
          className={`flex items-end ${half ? "flex-col items-start gap-1" : "flex-row gap-3"}`}
        >
          <p
            className={`text-buttonDark font-medium border border-gray px-2 rounded-xl ${half ? "text-xs" : "text-sm"}`}
          >
            {new Intl.NumberFormat("fr-FR").format(item.points)} Puntos
          </p>
          <p className="text-xs text-red-500">
            {item.leftDays > 0
              ? `Te quedan ${item.leftDays} dias`
              : item.leftDays < 0
                ? "Reto vencido"
                : "Último día"}
          </p>
        </div>
      </div>
      <img
        src={item.url}
        alt="image"
        className={`w-full rounded-b-xl object-cover ${!half && "h-40"}`}
      />
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
  const { url, name, points } = item;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/reward/${item.id}`)}
      className={`bg-background rounded-2xl shadow-md/30 ${!half && "min-w-40 mr-4"}`}
    >
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
          <div className="flex items-center px-2 text-[10px]">
            {canRedeem ? (
              <MdVerified className="text-tabs" size={30} />
            ) : (
              <FaLock className="text-gray" size={26} />
            )}
            <span className="ml-2">
              {canRedeem
                ? "Ya puedes canjear este premio"
                : "Te faltan puntos para este canje"}
            </span>
          </div>
        ) : (
          <span className="text-xs">Canjea ahora por</span>
        )}

        <p className="text-pointsGreen text-sm truncate">
          <span className="font-bold">
            {new Intl.NumberFormat("fr-FR").format(points)}
          </span>{" "}
          puntos
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
          <p className="text-xs">Canjea aquí</p>
        </button>
      </div>
    </div>
  );
};

interface NewsComponent {
  item: News;
}

export const NewsCard = ({ item }: NewsComponent) => {
  const { description, image, subtitle, title } = item;
  return (
    <div className="bg-background rounded-2xl mr-4 shadow-md min-w-full flex px-4 items-center">
      <img
        src={image}
        alt={title}
        className="h-24 object-contain rounded-2xl"
        loading="lazy"
      />

      <div className="p-2 flex flex-col items-center gap-2">
        <h3 className="text-[12px] font-semibold capitalize">{title}</h3>
        <p className="text-[10px]">{subtitle}</p>
        <p className="text-[10px] font-thin line-clamp-2">{description}</p>
      </div>
    </div>
  );
};
