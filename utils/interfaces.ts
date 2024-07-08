interface cardBasicInfo {
  name: string;
  doubleName: string;
  medals: string[];
  snsInfo: { name: string; src: string; userId: string; baseLink: string }[];
  setName: (name: string) => void;
  setDoubleName: (doubleName: string) => void;
  setMedals: (medals: string[]) => void;
  setSnsInfo: (
    snsInfo: { name: string; src: string; userId: string; baseLink: string }[],
  ) => void;
}

interface cardAppearanceInfo {
  backgroundImage: string;
  fontName: string;
  setBackgroundImage: (backgroundImage: string) => void;
  setFontName: (fontName: string) => void;
}

interface cardInfo extends cardBasicInfo, cardAppearanceInfo {}

export { cardInfo };
