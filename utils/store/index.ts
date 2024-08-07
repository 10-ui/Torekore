import { create } from "zustand";
import {
  CardInfo,
  MissionState,
  Mission,
  CardPropaty,
  CardImageInfo,
  AppState,
} from "@/utils/interface";
import { Session } from "@supabase/supabase-js";
import missiondata from "@/utils/data/missiondata";

const useAppStateStore = create<AppState>()((set) => ({
  session: null,
  isMounted: false,
  setSession: (session: Session | null) => set({ session }),
  setIsMounted: (isMounted: boolean) => set({ isMounted }),
}));

const useCardInfoStore = create<CardInfo>()((set) => ({
  name: "",
  doubleName: "",
  backgroundImage: "",
  avatarUrl: "",
  snsInfo: [],
  fontName: "",
  uniqueID: "",
  setUniqueID: (uniqueID: string) => set({ uniqueID }),
  setAvatarUrl: (avatarUrl) => set({ avatarUrl }),
  setSnsInfo: (snsInfo) => set({ snsInfo }),
  setName: (name) => set({ name }),
  setDoubleName: (doubleName) => set({ doubleName }),
  setBackgroundImage: (backgroundImage) => set({ backgroundImage }),
  setFontName: (fontName) => set({ fontName }),
  setAllCardInfo: (cardPropaty: CardPropaty) =>
    set({
      name: cardPropaty.name,
      doubleName: cardPropaty.doubleName,
      fontName: cardPropaty.fontName,
      uniqueID: cardPropaty.uniqueID,
      snsInfo: cardPropaty.snsInfo,
    }),
  setAllImageInfo: (cardImageInfo: CardImageInfo) =>
    set({
      backgroundImage: cardImageInfo.backgroundImage,
      avatarUrl: cardImageInfo.avatarUrl,
    }),
}));

const useUserStateStore = create<MissionState>()((set) => ({
  missions: missiondata.map((mission) => ({
    ...mission,
    isCompleted: false,
  })),
  setIsCompleted: (missionID: number, isCompleted: boolean) =>
    set((state) => {
      const updatedMissions = state.missions.map((mission) =>
        mission.id === missionID ? { ...mission, isCompleted } : mission,
      );
      return { missions: updatedMissions };
    }),
  setMissions: (missions: Mission[]) => set({ missions }),
}));

export { useCardInfoStore, useUserStateStore, useAppStateStore };
