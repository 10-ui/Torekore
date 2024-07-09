import { useState } from "react";
import { Text, View, Pressable } from "react-native";
import ExpoImage from "@/components/expo-image";
import CardView from "@/components/card/card-view";
import { Button } from "@/components/button";
import { useCardInfoStore } from "@/utils/store";
import { fontNameData } from "@/utils/data/fontnamedata";
import { bgImageData } from "@/utils/data/bgimagedata";
import { docking } from "@/utils/docking";

export default function CardStyle() {
  const { fontName, backgroundImage } = useCardInfoStore();
  const setFontName = useCardInfoStore((state) => state.setFontName);
  const setBackgroundImage = useCardInfoStore(
    (state) => state.setBackgroundImage,
  );
  const [isOpened, setIsOpened] = useState(false);

  return (
    <View className='w-full space-y-7'>
      <CardView />
      <View className='h-30 mt-7 border border-input bg-white px-3 py-4'>
        <Text className='mb-4'>背景</Text>
        <View className='flex flex-row gap-2'>
          {bgImageData.map((bgImage) => (
            <Pressable
              key={bgImage.name}
              onPress={() => setBackgroundImage(bgImage.src)}>
              <ExpoImage
                source={bgImage.src}
                className={docking(
                  "w-23 h-14 border border-input",
                  bgImage.src === backgroundImage
                    ? "border-2 border-appBlue"
                    : "border-input",
                )}
              />
            </Pressable>
          ))}
        </View>
      </View>
      <View className='mt-6 flex flex-row items-start justify-between border border-input bg-white px-4 py-3'>
        <Text className='mr-7 text-base'>二つ名</Text>
        <View className='flex-1 flex-col'>
          <Pressable
            className={docking(
              "relative flex h-8 grow items-center justify-center border-input bg-appLightBlue",
              isOpened ? "rounded-t-md border-x border-t" : "rounded-md border",
            )}
            onPress={() => setIsOpened(!isOpened)}>
            <Text>{fontName}</Text>
            <View className='absolute right-1 top-1'>
              <ExpoImage
                source={
                  isOpened
                    ? require("@/assets/logos/sns/minus.svg")
                    : require("@/assets/logos/sns/plus.svg")
                }
                className='h-5 w-5'
              />
            </View>
          </Pressable>
          {isOpened && (
            <View>
              {fontNameData.map((font, index: number) => (
                <Pressable
                  key={font.name}
                  onPress={() => setFontName(font.setName)}
                  className={docking(
                    "flex h-8 grow items-center justify-center border-input bg-appLightBlue",
                    index === fontNameData.length - 1
                      ? "rounded-b-md border"
                      : "border-x border-t",
                  )}>
                  <Text
                    key={font.name}
                    className={docking(
                      font.setName === fontName
                        ? "text-slate-300"
                        : "text-black",
                    )}>
                    {font.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
      <Button label='保存してプレビュー' className='mt-6' />
    </View>
  );
}
