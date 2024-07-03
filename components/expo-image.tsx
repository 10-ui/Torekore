import React from "react";
import { cssInterop } from "nativewind";
import { Image, ImageProps } from "expo-image";

cssInterop(Image, { className: "style" });

const ExpoImage = React.forwardRef<React.ElementRef<typeof Image>, ImageProps>(
  (props, ref) => {
    return <Image ref={ref} {...props} />;
  },
);

export default ExpoImage;
