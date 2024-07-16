interface cardBasicInfo {
  name: string;
  doubleName: string;
  snsInfo: { name: string; src: string; userId: string; baseLink: string }[];
  fontName: string;
  iconImage: string;
  setIconImage: (iconImage: string) => void;
  setName: (name: string) => void;
  setDoubleName: (doubleName: string) => void;
  setSnsInfo: (
    snsInfo: { name: string; src: string; userId: string; baseLink: string }[],
  ) => void;
  setFontName: (fontName: string) => void;
}

interface cardAppearanceInfo {
  backgroundImage: string;
  fontName: string;
  setBackgroundImage: (backgroundImage: string) => void;
  setFontName: (fontName: string) => void;
}

interface cardInfo extends cardBasicInfo, cardAppearanceInfo {}

interface missions {
  source: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

interface qrcodeInfo {
  uniqueID: string;
  setUniqueID: (uniqueID: string) => void;
}

interface userState extends qrcodeInfo {
  missions: missions[];
  setMissions: (missions: missions[]) => void;
  setIsCompleted: (missionIndex: number, isCompleted: boolean) => void;
}

export { cardInfo, userState, missions };
