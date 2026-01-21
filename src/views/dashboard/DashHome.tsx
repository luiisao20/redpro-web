import { BannerCard, ChallengeCard, RewardCard } from "../../components/Cards";
import { Carousel } from "../../components/Carousel";
import { Header } from "../../components/Header";
import { PointsComponent } from "../../components/PointsComponent";
import {
  bannersMock,
  challengesMock,
  productsMock,
} from "../../helpers/examples";

export const DashHome = () => {
  return (
    <div className="px-10 mb-30">
      <Header />
      <PointsComponent />
      <Carousel hideDots data={bannersMock}>
        {bannersMock.map((item, index) => (
          <BannerCard key={index} item={item} />
        ))}
      </Carousel>
      <div className="flex justify-between text-xl">
        <h2 className="font-bold">Retos destacados</h2>
        <a className="font-thin hover:underline hover:underline-offset-2 cursor-pointer">
          Ver todos
        </a>
      </div>
      <Carousel width={256} data={challengesMock}>
        {challengesMock.map((item, index) => (
          <ChallengeCard key={index} item={item} />
        ))}
      </Carousel>
      <div className="flex justify-between text-xl">
        <h2 className="font-bold">Canjea tus puntos</h2>
        <a className="font-thin hover:underline hover:underline-offset-2 cursor-pointer">
          Ver todos
        </a>
      </div>
      <Carousel data={productsMock} width={120}>
        {productsMock.map((item, index) => (
          <RewardCard key={index} item={item} />
        ))}
      </Carousel>
    </div>
  );
};
