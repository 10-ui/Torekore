import { create } from "zustand";
import { cardInfo, userState, missions } from "@/utils/interfaces";

const useCardInfoStore = create<cardInfo>()((set) => ({
  name: "",
  doubleName: "かけだしの 学生",
  selectedIcons: Array(4).fill(require("@/assets/logos/sns/empty.png")),
  backgroundImage: require("@/assets/background/bg_blue.png"),
  iconImage: "",
  snsInfo: Array(4).fill({
    name: "",
    src: require("@/assets/logos/sns/empty.png"),
    userId: "",
    baseLink: "",
  }),
  fontName: "Noto Sans JP",
  setIconImage: (iconImage) => set({ iconImage }),
  setSnsInfo: (snsInfo) => set({ snsInfo }),
  setName: (name) => set({ name }),
  setDoubleName: (doubleName) => set({ doubleName }),
  setBackgroundImage: (backgroundImage) => set({ backgroundImage }),
  setFontName: (fontName) => set({ fontName }),
}));

const useUserStateStore = create<userState>()((set) => ({
  uniqueID: "",
  missions: Array(2).fill({
    source: require("@/assets/icons/mission/empty.png"),
    title: "",
    description: "",
    isCompleted: null,
  }),
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
