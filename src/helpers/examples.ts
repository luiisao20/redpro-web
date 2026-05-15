import type { News, Onboarding } from "../interfaces/interface";

export const mockOnboarding: Onboarding[] = [
  {
    title: "Bienvenido a Red Pro",
    description:
      "Tu nueva forma de acceder a beneficios, retos y premios para ti y tu negocio.",
    image: "/images/1.png",
  },
  {
    title: "Cumple retos y gana premios increíbles",
    description:
      "Usa RedPro, completa tus retos y acumula puntos para canjear beneficios que te ayuden a hacer crecer tu tienda",
    image: "/images/2.png",
  },
  {
    title: "Queremos llamarte como a ti te gusta",
    description:
      "Escríbenos tu nombre o apodo para saludarte de forma más cercana en RedPro",
    image: "/images/3.png",
  },
];

export const newsMock: News[] = [
  {
    id: 1,
    title: "PRONACA presenta nueva imagen: ‘El futuro se alimenta hoy’",
    description:
      "La empresa PRONACA avanza en su proceso de transformación y expansión. En abril de 2025 lanzó una nueva imagen corporativa con su campaña “El futuro se alimenta hoy”, reafirmando su compromiso con una alimentación saludable, accesible y de calidad para millones de familias en Ecuador, Panamá y Estados Unidos.",
    image: "/news-1.png",
  },
  {
    id: 2,
    title:
      "Estrategia de Sostenibilidad 2030: PRONACA impulsa innovación y bienestar",
    description:
      "Con más de 65 años de trayectoria, PRONACA presentó su Estrategia de Sostenibilidad 2030, centrada en innovación, eficiencia energética y reforestación. Esta iniciativa fortalece su papel como actor clave en el desarrollo sostenible del país.",

    image: "/news-2.png",
  },
  {
    id: 3,
    title: "Exportación de pescado con valor agregado: PRONACA llega a Panamá",
    description:
      "En marzo de 2025, PRONACA alcanzó un hito en su internacionalización al realizar la primera exportación de productos de pescado con valor agregado hacia el mercado panameño, llevando la calidad ecuatoriana más allá de nuestras fronteras.",
    image: "/news-3.png",
  },
  {
    id: 4,
    title: "Marcas de PRONACA reconocidas entre las más influyentes del país",
    description:
      "Las marcas PRONACA, Mr. Pollo, Plumrose y Gustadina fueron reconocidas como algunas de las más influyentes en Ecuador. Este reconocimiento refuerza la relevancia de la empresa en la mente del consumidor.",
    image: "/news-4.png",
  },
];
