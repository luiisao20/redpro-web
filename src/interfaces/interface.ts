export interface Onboarding {
  title: string;
  description: string;
  image: string;
}

export interface Sku {
  id: string;
  name: string;
  url: string;
}

export interface Challenge {
  id: number;
  name: string;
  description: string;
  leftDays: number;
  points: string | number;
  startDate?: string;
  endDate?: string;
  type?: string;
  status?: boolean;
  image?: string;
  url?: string;
  products?: Sku[];
  isAccepted?: boolean;
}

export interface Banner {
  id: number;
  url: string;
  title: string;
}

export interface Product {
  id: number;
  sku?: string;
  name: string;
  description: string;
  points: number;
  url?: string;
  status?: boolean;
}

export interface News {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface NewUser {
  password: string;
  confirmPassword: string;
  code: string;
  name: string;
}

export interface UserData {
  name: string;
  cellphone: string;
  code: string;
  points: number;
}

export interface TransactionHistory {
  id?: number;
  date: string;
  idChallenge?: number;
  challengeName?: string;
  challengePoints?: number;
  challengeDescription?: string;
  idReward?: number;
  rewardName?: string;
  rewardPoints?: number;
  rewardDescription?: string;
}
