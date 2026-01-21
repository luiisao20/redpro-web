import type {
  Banner,
  Challenge,
  News,
  Onboarding,
  Product,
} from "../interfaces/interface";

export const mockOnboarding: Onboarding[] = [
  {
    title: "Bienvenido a Red Pro",
    description: "La red que te conecta con beneficios y servicios de Pronaca.",
    image: "/onboarding-1.png",
  },
  {
    title: "Todo en un solo lugar",
    description:
      "Consulta tus beneficios, gestiona tus servicios y haz crecer tu negocio.",
    image: "/onboarding-2.png",
  },
  {
    title: "Queremos conocerte",
    description: "¿Cómo quieres que te llamemos en la app?",
    image: "/onboarding-3.png",
  },
];

export const challengesMock: Challenge[] = [
  {
    id: 1,
    name: "Reto Bienvenida",
    description: "Completa tu primer reto y gana puntos.",
    leftDays: 5,
    points: 100,
    url: "/challenge-example-1.webp",
  },
  {
    id: 2,
    name: "Compra Inteligente",
    description: "Aprende a elegir productos con mejor calidad.",
    leftDays: 10,
    points: 150,
    url: "/challenge-example-2.webp",
  },
  {
    id: 3,
    name: "Ahorro Semanal",
    description: "Reduce gastos siguiendo consejos prácticos.",
    leftDays: 7,
    points: 200,
    url: "/challenge-example-3.webp",
  },
  {
    id: 4,
    name: "Consumo Responsable",
    description: "Promueve hábitos de consumo sostenibles.",
    leftDays: 12,
    points: 180,
    url: "/challenge-example-4.webp",
  },
];

export const bannersMock: Banner[] = [
  {
    id: 1,
    url: "/image-1.png",
    title: "Promoción 1",
  },
  {
    id: 2,
    url: "/image-2.png",
    title: "Promoción 2",
  },
  {
    id: 3,
    url: "/image-3.png",
    title: "Promoción 3",
  },
];

export const productsMock: Product[] = [
  {
    id: 1,
    name: "Taza Térmica",
    description: "Taza reutilizable para bebidas calientes.",
    points: 500,
    url: "/reward-1.webp",
  },
  {
    id: 2,
    name: "Botella Deportiva",
    description: "Botella resistente ideal para actividades físicas.",
    points: 750,
    url: "/reward-2.webp",
  },
  {
    id: 3,
    name: "Mochila Urbana",
    description: "Mochila ligera para uso diario.",
    points: 1200,
    url: "/reward-3.webp",
  },
  {
    id: 4,
    name: "Audífonos Inalámbricos",
    description: "Audífonos con conexión Bluetooth y alta calidad de sonido.",
    points: 1800,
    url: "/reward-4.webp",
  },
  {
    id: 5,
    name: "Cuaderno Ecológico",
    description: "Cuaderno fabricado con materiales reciclados.",
    points: 300,
    url: "/reward-5.webp",
  },
];

export const newsMock: News[] = [
  {
    id: 1,
    title: "PRONACA presenta nueva imagen: ‘El futuro se alimenta hoy’",
    subtitle: "Una transformación con visión al 2025",
    description:
      "La empresa PRONACA avanza en su proceso de transformación y expansión. En abril de 2025 lanzó una nueva imagen corporativa con su campaña “El futuro se alimenta hoy”, reafirmando su compromiso con una alimentación saludable, accesible y de calidad para millones de familias en Ecuador, Panamá y Estados Unidos.",
    image: "/news-1.png",
  },
  {
    id: 2,
    title:
      "Estrategia de Sostenibilidad 2030: PRONACA impulsa innovación y bienestar",
    subtitle: "Compromiso integral con personas, animales y planeta",
    description:
      "Con más de 65 años de trayectoria, PRONACA presentó su Estrategia de Sostenibilidad 2030, centrada en innovación, eficiencia energética y reforestación. Esta iniciativa fortalece su papel como actor clave en el desarrollo sostenible del país.",

    image: "/news-2.png",
  },
  {
    id: 3,
    title: "Exportación de pescado con valor agregado: PRONACA llega a Panamá",
    subtitle: "Expansión internacional en proteína de calidad",
    description:
      "En marzo de 2025, PRONACA alcanzó un hito en su internacionalización al realizar la primera exportación de productos de pescado con valor agregado hacia el mercado panameño, llevando la calidad ecuatoriana más allá de nuestras fronteras.",
    image: "/news-3.png",
  },
  {
    id: 4,
    title: "Marcas de PRONACA reconocidas entre las más influyentes del país",
    subtitle: "Refuerzo de posicionamiento de marca en Ecuador",
    description:
      "Las marcas PRONACA, Mr. Pollo, Plumrose y Gustadina fueron reconocidas como algunas de las más influyentes en Ecuador. Este reconocimiento refuerza la relevancia de la empresa en la mente del consumidor.",
    image: "/news-4.png",
  },
];
