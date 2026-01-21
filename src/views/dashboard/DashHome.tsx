import { useEffect } from "react";
import {
  BannerCard,
  ChallengeCard,
  NewsCard,
  RewardCard,
} from "../../components/Cards";
import { Carousel } from "../../components/Carousel";
import { Header } from "../../components/Header";
import { PointsComponent } from "../../components/PointsComponent";
import {
  bannersMock,
  challengesMock,
  newsMock,
  productsMock,
} from "../../helpers/examples";
import { driver, type DriveStep } from "driver.js";
import "driver.js/dist/driver.css";
import { useNavigate } from "react-router";

export const DashHome = () => {
  const navigate = useNavigate();
  const steps: DriveStep[] = [
    {
      popover: {
        title: `¡Hola!
        Soy Mr. Pro, voy a acompañarte en tu recorrido por Red Pro`,
        popoverClass: "mrpro-popover",
        description: `Te voy a mostrar todo lo que puedes hacer aquí: como ganar puntos, descubrir promociones, participar en retos y canjear premios increíbles.
            ¡Vamos juntos paso a paso para que saques el máximo provecho de la app!`,
        showButtons: [],
      },
    },
    {
      element: "#points",
      popover: {
        title: "¡Mira cuántos puntos tienes!",
        popoverClass: "mrpro-popover",
        description: `Aquí puedes ver todos los puntos que has acumulado por tus compras y actividades.
        ¡Sigue participando y verás cómon!
        Cada punto te acerca a premios increíbles.`,
        showButtons: [],
      },
    },
    {
      element: "#banners",
      popover: {
        title: "¡No te pierdas ninguna oportunidad!",
        popoverClass: "mrpro-popover",
        description: `Mantente al día con las últimas promociones y novedades que Pronaca tiene para ti.`,
        showButtons: [],
      },
    },
    {
      element: "#challenges",
      popover: {
        title: "¡Acepta el reto y demuestra que eres un Pro!",
        popoverClass: "mrpro-popover",
        description: `Explora retos disponibles y participa para seguir sumando puntos.`,
        showButtons: [],
      },
    },
    {
      element: "#rewards",
      popover: {
        title: "¡Elige tu favorito y disfruta tu recompensa!",
        popoverClass: "mrpro-popover",
        description: `En esta sección encontrarás los premios disponibles a canjear con tus puntos.`,
        showButtons: [],
        onNextClick: () => console.log("here"),
      },
    },
  ];
  const driverObj = driver({
    showProgress: false,
    allowClose: false,
    steps,
  });

  useEffect(() => {
    const seen = localStorage.getItem("tutorial") === "seen";
    if (!seen) driverObj.drive();
  }, []);

  useEffect(() => {
    const handleClick = (e: Event) => {
      const popover = document.querySelector(".mrpro-popover");

      if (!popover || !popover.contains(e.target as Node)) return;

      if (driverObj.getActiveIndex() === steps.length - 1) {
        localStorage.setItem("tutorial", "seen");
        navigate("/onboarding");
      }
      driverObj.moveNext();
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="px-10 mb-30">
      <div id="demo-theme" onClick={() => driverObj.drive()}>
        <Header />
      </div>
      <PointsComponent id="points" />
      <Carousel id="banners" hideDots data={bannersMock}>
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
      <Carousel id="challenges" width={256} data={challengesMock}>
        {challengesMock.map((item, index) => (
          <ChallengeCard key={index} item={item} />
        ))}
      </Carousel>
      <div className="flex justify-between text-xl mt-6">
        <h2 className="font-bold">Canjea tus puntos</h2>
        <a className="font-thin hover:underline hover:underline-offset-2 cursor-pointer">
          Ver todos
        </a>
      </div>
      <Carousel id="rewards" data={productsMock} width={120}>
        {productsMock.map((item, index) => (
          <RewardCard key={index} item={item} />
        ))}
      </Carousel>
      <div className="flex justify-between text-xl mt-6">
        <h2 className="font-bold">Noticias</h2>
        <a className="font-thin hover:underline hover:underline-offset-2 cursor-pointer">
          Ver todos
        </a>
      </div>
      <Carousel id="news" data={newsMock} width={400}>
        {newsMock.map((item, index) => (
          <NewsCard key={index} item={item} />
        ))}
      </Carousel>
    </div>
  );
};
