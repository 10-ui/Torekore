import { cssInterop } from "nativewind";
import { Image, ImageProps } from "expo-image";

cssInterop(Image, { className: "style" });

const ExpoImage = (props: ImageProps) => {
  return <Image {...props} />;
};

export default ExpoImage;
