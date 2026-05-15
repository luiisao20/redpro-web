import { useNavigate, useParams } from "react-router";
import { GoBackButton } from "../../components/Button";
import { useEffect, useState } from "react";
import type { News } from "../../interfaces/interface";
import { useNewsItem } from "../../presentation/news/useNewsItem";

export const NewsItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const idNews = parseInt(id!);

  const [newsInfo, setNewsInfo] = useState<News>();

  const { newsItemQuery } = useNewsItem(idNews);

  useEffect(() => {
    if (newsItemQuery.data) setNewsInfo(newsItemQuery.data);
  }, [newsItemQuery.data]);

  return (
    <div className="bg-background pt-6 relative min-h-screen">
      <div className="absolute top-2 left-2">
        <GoBackButton onClick={() => navigate(-1)} />
      </div>

      <div className="flex flex-col items-center justify-center mx-8">
        <h2 className="text-2xl mt-4 text-center font-semibold">
          {newsInfo?.title}
        </h2>

        <img
          src={newsInfo?.image}
          alt="news"
          className="w-62.5 h-62.5 rounded-xl mt-4 object-cover"
        />

        <p className="mt-4 text-[14px] leading-6 text-justify">
          {newsInfo?.description}
        </p>
      </div>
    </div>
  );
};
