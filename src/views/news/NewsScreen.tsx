import { useNavigate } from "react-router";
import { GoBackButton } from "../../components/Button";
import { useEffect, useState } from "react";
import type { News } from "../../interfaces/interface";
import { useNews } from "../../presentation/news/useNews";
import InfiniteScroll from "react-infinite-scroll-component";
import { NewsCard } from "../../components/Cards";

export const NewsScreen = () => {
  const navigate = useNavigate();
  const [searchFilter, setSearchFilter] = useState("");
  const [dataNews, setDataNews] = useState<News[]>([]);

  const { newsQuery, loadNextPage, nextPage } = useNews(searchFilter);

  useEffect(() => {
    if (newsQuery.data)
      setDataNews(newsQuery.data.pages.flatMap((page) => page) ?? []);
  }, [newsQuery.data]);

  return (
    <div className="relative mt-4 mb-10">
      <div className="absolute -top-6 left-2">
        <GoBackButton onClick={() => navigate(-1)} />
      </div>
      <div className="flex flex-col gap-6 px-6 mb-6">
        <h2 className="text-center text-2xl font-bold">Noticias</h2>
        <div className="relative">
          <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3 pointer-events-none">
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
      </div>
      <InfiniteScroll
        dataLength={dataNews.length}
        next={loadNextPage}
        hasMore={!!nextPage}
        loader={<p>Cargando más premios...</p>}
      >
        <div className="grid grid-cols-2 gap-4 mb-10 px-6">
          {dataNews.map((item, index) => (
            <NewsCard item={item} key={index} half />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
