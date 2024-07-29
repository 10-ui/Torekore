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
  avatarUrl: string;
}

interface SetCardImageInfo {
  setBackgroundImage: (backgroundImage: string) => void;
  setAvatarUrl: (avatarUrl: string) => void;
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

interface Card {
  id: string;
  author_id: string;
  unique_id: string;
  name: string;
  double_name: string;
  avatar_url: string | null;
  background_url: string | null;
  font_name: string;
  created_at: string;
  updated_at: string | null;
}

interface SNS {
  id: string;
  author_id: string | null;
  user_id: string;
  sns_id: string;
  created_at: string;
  updated_at: string | null;
}

interface StoredCard extends Card {
  sns: SNS[];
}

export {
  CardInfo,
  MissionState,
  Mission,
  CardPropaty,
  CardImageInfo,
  AppState,
  StoredCard,
  Card,
  SNS,
};
