import type { Banner, Challenge, Onboarding, Product } from "../interfaces/interface";

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
    name: 'Taza Térmica',
    description: 'Taza reutilizable para bebidas calientes.',
    points: 500,
    url: '/reward-1.webp'
  },
  {
    id: 2,
    name: 'Botella Deportiva',
    description: 'Botella resistente ideal para actividades físicas.',
    points: 750,
    url: '/reward-2.webp'
  },
  {
    id: 3,
    name: 'Mochila Urbana',
    description: 'Mochila ligera para uso diario.',
    points: 1200,
    url: '/reward-3.webp'
  },
  {
    id: 4,
    name: 'Audífonos Inalámbricos',
    description: 'Audífonos con conexión Bluetooth y alta calidad de sonido.',
    points: 1800,
    url: '/reward-4.webp'
  },
  {
    id: 5,
    name: 'Cuaderno Ecológico',
    description: 'Cuaderno fabricado con materiales reciclados.',
    points: 300,
    url: '/reward-5.webp'
  },
]

