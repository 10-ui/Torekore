import { create } from "zustand";
import { cardInfo, userState, missions } from "@/utils/interfaces";

const useCardInfoStore = create<cardInfo>()((set) => ({
  name: "",
  doubleName: "かけだしの 学生",
  selectedIcons: Array(4).fill(require("@/assets/logos/sns/empty.png")),
  medals: [],
  backgroundImage: require("@/assets/background/bg_blue.png"),
  snsInfo: Array(4).fill({
    name: "",
    src: require("@/assets/logos/sns/empty.png"),
    userId: "",
    baseLink: "",
  }),
  fontName: "Noto Sans JP",
  setSnsInfo: (snsInfo) => set({ snsInfo }),
  setName: (name) => set({ name }),
  setDoubleName: (doubleName) => set({ doubleName }),
  setMedals: (medals) => set({ medals }),
  setBackgroundImage: (backgroundImage) => set({ backgroundImage }),
  setFontName: (fontName) => set({ fontName }),
}));

const useUserStateStore = create<userState>()((set) => ({
  uniqueID: "",
  missions: [
    {
      source: require("@/assets/icons/mission/firstchange.png"),
      title: "はじまりの証",
      description: "カード交換をしてみよう",
      isCompleted: false,
    },
    {
      source: require("@/assets/icons/mission/sns.png"),
      title: "広げる輪",
      description: "SNSにシェアしてみよう",
      isCompleted: false,
    },
    {
      source: require("@/assets/icons/mission/10friend.png"),
      title: "社交ビギナー",
      description: "10人とカード交換してみよう",
      isCompleted: false,
    },
    {
      title: "グローバル！",
      source: require("@/assets/icons/mission/global.png"),
      description: "国籍の異なる人とカードを交換しよう",
      isCompleted: false,
    },
  ],
  setIsCompleted: (missionIndex: number, isCompleted: boolean) => {
    set((state) => {
      const missions = state.missions.map((mission, index) => {
        if (index === missionIndex) {
          return { ...mission, isCompleted: isCompleted };
        }
        return mission;
      });
      return { missions };
    });
  },
  setMissions: (missions: missions[]) => set({ missions }),
  setUniqueID: (uniqueID: string) => set({ uniqueID }),
}));

export { useCardInfoStore, useUserStateStore };
