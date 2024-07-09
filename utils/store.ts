import { create } from "zustand";
import { cardInfo } from "@/utils/interfaces";

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

export { useCardInfoStore };
