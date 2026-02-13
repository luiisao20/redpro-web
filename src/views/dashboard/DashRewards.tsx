import { useEffect, useState } from "react";
import { FiltersComponent } from "../../components/FiltersComponent";
import { useAuthStore } from "../../presentation/store/useAuthStore";
import { useUser } from "../../presentation/user/useUser";
import type { Product, UserData } from "../../interfaces/interface";
import { useRewards } from "../../presentation/userData/useRewards";
import InfiniteScroll from "react-infinite-scroll-component";
import { RewardCard } from "../../components/Cards";
import { GoBackButton } from "../../components/Button";
import { useNavigate } from "react-router";

export const DashRewards = () => {
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [userData, setUserData] = useState<UserData>();
  const [rewardsList, setRewardsList] = useState<Product[]>([]);
  const navigate = useNavigate();

  const { user } = useAuthStore();

  const { userQuery } = useUser(user?.id);
  const { loadNextPage, rewardsQuery, nextPage } = useRewards({
    points: userData?.points,
    searchText: searchFilter,
    codeClient: userData?.code,
    filter: filter,
    maxPoints: userData?.maxPoints,
  });

  useEffect(() => {
    if (userQuery.data) setUserData(userQuery.data);
  }, [userQuery.data]);

  useEffect(() => {
    if (rewardsQuery.data)
      setRewardsList(rewardsQuery.data.pages.flatMap((page) => page) ?? []);
  }, [rewardsQuery.data]);

  return (
    <div className="relative mt-4 mb-10">
      <div className="absolute -top-6 left-2">
        <GoBackButton onClick={() => navigate(-1)} />
      </div>
      <div className="flex flex-col gap-6 px-6 mb-6">
        <h2 className="text-center text-2xl font-bold">Catálogo de premios</h2>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-2 ps-10 text-sm text-gray-900 rounded-lg bg-buttonLight focus:ring-blue-500 focus:border-blue-500"
            placeholder="Buscar"
            required
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>
        <FiltersComponent
          rewards
          onSetFilter={setFilter}
          onCleanFilter={() => setFilter("")}
        />
      </div>
      <InfiniteScroll
        dataLength={rewardsList.length}
        next={loadNextPage}
        hasMore={!!nextPage}
        loader={<p>Cargando más premios...</p>}
      >
        <div className="grid grid-cols-2 gap-4 mb-10 px-6">
          {rewardsList.map((item, index) => (
            <RewardCard
              item={item}
              canRedeem={userData?.points! >= item.points}
              key={index}
              half
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
