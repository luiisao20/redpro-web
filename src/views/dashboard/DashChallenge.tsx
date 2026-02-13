import { useEffect, useState } from "react";
import { FiltersComponent } from "../../components/FiltersComponent";
import { useAuthStore } from "../../presentation/store/useAuthStore";
import { useChallenges } from "../../presentation/userData/useChallenges";
import type { Challenge } from "../../interfaces/interface";
import { ChallengeCard } from "../../components/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import { GoBackButton } from "../../components/Button";
import { useNavigate } from "react-router";

export const DashChallenge = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [challengesList, setChallengesList] = useState<Challenge[]>([]);
  const navigate = useNavigate();

  const { user } = useAuthStore();

  const { challengesQuery, nextPage, loadNextPage } = useChallenges(
    user?.id,
    searchFilter,
  );

  useEffect(() => {
    if (challengesQuery.data)
      setChallengesList(
        challengesQuery.data.pages.flatMap((page) => page) ?? [],
      );
  }, [challengesQuery.data]);

  return (
    <div className="relative mt-4 mb-10">
      <div className="absolute -top-6 left-2">
        <GoBackButton onClick={() => navigate(-1)} />
      </div>
      <div className="mx-6 flex flex-col gap-6 mb-6">
        <h2 className="text-center text-2xl font-bold">Retos Destacados</h2>
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
        <FiltersComponent />
      </div>
      <InfiniteScroll
        dataLength={challengesList.length}
        next={loadNextPage}
        hasMore={!!nextPage}
        loader={<p>Cargando más retos...</p>}
      >
        <div className="grid grid-cols-2 gap-4 mb-10 px-6">
          {challengesList.map((item, index) => (
            <ChallengeCard item={item} key={index} half />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
