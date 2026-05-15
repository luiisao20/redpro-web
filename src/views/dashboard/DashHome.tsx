import { useEffect, useState } from "react";
import {
  BannerCard,
  ChallengeCard,
  NewsCard,
  RewardCard,
} from "../../components/Cards";
import { Carousel } from "../../components/Carousel";
import { Header } from "../../components/Header";
import { PointsComponent } from "../../components/PointsComponent";
import { driver, type DriveStep } from "driver.js";
import "driver.js/dist/driver.css";
import { useNavigate } from "react-router";
import type {
  Banner,
  Challenge,
  News,
  Product,
  UserData,
} from "../../interfaces/interface";
import { useAuthStore } from "../../presentation/store/useAuthStore";
import { useUser } from "../../presentation/user/useUser";
import { LoaderComponent } from "../../components/LoaderComponent";
import { useBanners } from "../../presentation/userData/useBanners";
import { useChallenges } from "../../presentation/userData/useChallenges";
import { useRewards } from "../../presentation/userData/useRewards";
import { useNews } from "../../presentation/news/useNews";
import {ModalInit} from "./ModalInit";

interface ClientData {
  banners: Banner[];
  challenges: Challenge[];
  rewards: Product[];
}

export const DashHome = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>();
  const [clientData, setClientData] = useState<ClientData>({
    banners: [],
    challenges: [],
    rewards: [],
  });
  const [newsList, setNewsList] = useState<News[]>([]);

  const { user, logout } = useAuthStore();

  const { userQuery } = useUser(user?.id);

  const { bannersQuery } = useBanners(userData?.code);
  const { challengesQuery } = useChallenges(user?.id, "", "");
  const { rewardsQuery } = useRewards({
    filter: "",
    codeClient: userData?.code,
    maxPoints: userData?.maxPoints,
  });
  const { newsQuery } = useNews("");

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
    onHighlightStarted: () => document.body.classList.add("tutorial-active"),
    onDestroyed: () => document.body.classList.remove("tutorial-active"),
  });

  // Client data
  useEffect(() => {
    if (bannersQuery.data)
      setClientData((prev) => ({ ...prev, banners: bannersQuery.data }));
  }, [bannersQuery.data]);

  useEffect(() => {
    if (newsQuery.data)
      setNewsList(newsQuery.data.pages.flatMap((page) => page) ?? []);
  }, [newsQuery.data]);

  useEffect(() => {
    if (challengesQuery.data)
      setClientData((prev) => ({
        ...prev,
        challenges: challengesQuery.data.pages.flatMap((page) => page) ?? [],
      }));
  }, [challengesQuery.data]);

  useEffect(() => {
    if (rewardsQuery.data)
      setClientData((prev) => ({
        ...prev,
        rewards: rewardsQuery.data.pages.flatMap((page) => page) ?? [],
      }));
  }, [rewardsQuery.data]);

  // Tutorial
  useEffect(() => {
    // const seen = localStorage.getItem("tutorial") === "seen";
    // if (!seen) driverObj.drive();
  }, []);

  useEffect(() => {
    const handleClick = (e: Event) => {
      const popover = document.querySelector(".mrpro-popover");

      if (!popover || !popover.contains(e.target as Node)) return;

      if (driverObj.getActiveIndex() === steps.length - 1) {
        localStorage.setItem("tutorial", "seen");
        driverObj.destroy();
        navigate("/onboarding");
        return;
      }
      driverObj.moveNext();
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (userQuery.isError) {
      // 1. (Opcional) Limpiar estados locales o de persistencia
      localStorage.removeItem("tutorial");

      // 2. Limpiar el Store de Auth
      logout();

      // 3. Redirigir al Login o Landing
      navigate("/login", { replace: true });

      // 4. Mostrar una alerta (opcional)
      alert("Tu sesión ha expirado o hubo un error crítico.");
    }
  }, [userQuery.isError, navigate, logout]);

  // User data
  useEffect(() => {
    if (userQuery.data) setUserData(userQuery.data);
  }, [userQuery.data]);

  if (!userData || userQuery.isLoading) {
    return <LoaderComponent />;
  }

  return (
    <div>
      <div className="mb-30 relative">
        <Header user={userData} />
        <PointsComponent points={userData.points} id="points" />
        <Carousel
          classAdded="mr-6"
          autoScroll
          autoScrollInterval={3000}
          id="banners"
          hideDots
          data={clientData.banners}
        >
          <div className="flex">
            {clientData.banners.map((item, index) => (
              <div key={index} className="first:pl-0 pl-2 min-w-full">
                <BannerCard item={item} />
              </div>
            ))}
          </div>
        </Carousel>
        <div className="flex mx-6 justify-between text-xl">
          <h2 className="font-bold">Retos destacados</h2>
          <a
            onClick={() => navigate("/dashboard/challenges")}
            className="font-thin hover:underline hover:underline-offset-2 cursor-pointer"
          >
            Ver todos
          </a>
        </div>
        {clientData.challenges.length > 0 ? (
          <Carousel id="challenges" width={256} data={clientData.challenges}>
            {clientData.challenges.map((item, index) => (
              <ChallengeCard key={index} item={item} />
            ))}
          </Carousel>
        ) : (
          <p className="text-center font-semibold text-gray text-lg my-16 mx-6">
            No existen retos disponibles en este momento
          </p>
        )}
        <div className="flex mx-6 justify-between text-xl mt-6">
          <h2 className="font-bold">Canjea tus puntos</h2>
          <a
            onClick={() => navigate("/dashboard/rewards")}
            className="font-thin hover:underline hover:underline-offset-2 cursor-pointer"
          >
            Ver todos
          </a>
        </div>
        <Carousel id="rewards" data={clientData.rewards} width={160}>
          {clientData.rewards.map((item, index) => (
            <RewardCard
              key={index}
              item={item}
              canRedeem={userData.points >= item.points}
            />
          ))}
        </Carousel>
        <div className="flex mx-6 justify-between text-xl mt-6">
          <h2 className="font-bold">Noticias</h2>
          <a
            onClick={() => navigate("/news")}
            className="font-thin hover:underline hover:underline-offset-2 cursor-pointer"
          >
            Ver todos
          </a>
        </div>
        <Carousel id="news" data={newsList} width={600}>
          {newsList.map((item, index) => (
            <NewsCard key={index} item={item} />
          ))}
        </Carousel>
      </div>
      <ModalInit data={userData} />
    </div>
  );
};
