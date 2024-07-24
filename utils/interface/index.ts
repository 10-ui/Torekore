import { Session } from "@supabase/supabase-js";

interface CardTextInfo {
  name: string;
  doubleName: string;
  fontName: string;
  uniqueID: string;
}

interface SnsInfo {
  name: string;
  source: string;
  userId: string;
  baseLink: string;
}

interface SetCardTextInfo {
  setName: (name: string) => void;
  setDoubleName: (doubleName: string) => void;
  setFontName: (fontName: string) => void;
  setUniqueID: (uniqueID: string) => void;
  setSnsInfo: (snsInfo: SnsInfo[]) => void;
}

interface CardImageInfo {
  backgroundImage: string;
  iconImage: string;
}

interface SetCardImageInfo {
  setBackgroundImage: (backgroundImage: string) => void;
  setIconImage: (iconImage: string) => void;
}

interface CardPropaty extends CardTextInfo {
  snsInfo: SnsInfo[];
}

interface CardInfo
  extends CardTextInfo,
    SetCardTextInfo,
    CardImageInfo,
    SetCardImageInfo {
  [x: string]: any;
  snsInfo: SnsInfo[];
  setAllCardInfo: (cardPropaty: CardPropaty) => void;
  setAllImageInfo: (cardImageInfo: CardImageInfo) => void;
}

interface Mission {
  id: number;
  source: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

interface MissionState {
  missions: Mission[];
  setIsCompleted: (missionID: number, isCompleted: boolean) => void;
  setMissions: (missions: Mission[]) => void;
}

interface AppState {
  session: Session | null;
  isMounted: boolean;
  setSession: (session: Session | null) => void;
  setIsMounted: (isMounted: boolean) => void;
}

export {
  CardInfo,
  MissionState,
  Mission,
  CardPropaty,
  CardImageInfo,
  AppState,
};
