import { create } from "zustand";

interface NicknameState {
  nickname: string | undefined;

  setNickname: (text: string) => void;
}

export const useNicknameStore = create<NicknameState>()((set) => ({
  nickname: undefined,

  setNickname: (value: string) => {
    localStorage.setItem("nickname", value);
    set({ nickname: value });
  },
}));
