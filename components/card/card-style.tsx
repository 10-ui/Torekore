import { useState } from "react";
import { Text, View, Pressable } from "react-native";
import ExpoImage from "@/components/expo-image";
import CardView from "@/components/card/card-view";
import { Button } from "@/components/button";
import { useCardInfoStore } from "@/utils/store";
import fontNameData from "@/utils/data/fontnamedata";
import bgImageData from "@/utils/data/bgimagedata";
import { docking } from "@/utils/docking";
import * as ImagePicker from "expo-image-picker";

export default function CardStyle() {
  const { fontName, backgroundImage } = useCardInfoStore();
  const setFontName = useCardInfoStore((state) => state.setFontName);
  const setBackgroundImage = useCardInfoStore(
    (state) => state.setBackgroundImage,
  );
  const [isOpened, setIsOpened] = useState(false);
  const onCropImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setBackgroundImage(result.assets[0].uri);
    }
  };

  return (
    <View className='w-full space-y-7'>
      <CardView />
      <View className='mt-7 h-30 border border-input bg-white px-3 py-4'>
        <Text className='mb-4'>背景</Text>
        <View className='flex flex-row gap-2 overflow-scroll'>
          {bgImageData.map((bgImage) => (
            <Pressable
              key={bgImage.name}
              onPress={() => setBackgroundImage(bgImage.src)}>
              <ExpoImage
                source={bgImage.src}
                className={docking(
                  "h-14 w-23 border border-input",
                  bgImage.src === backgroundImage
                    ? "border-2 border-appBlue"
                    : "border-input",
                )}
              />
            </Pressable>
          ))}
          <Pressable
            onPress={onCropImage}
            className='relative h-14 w-23 border border-input'>
            <ExpoImage
              source={require("@/assets/logos/camera.png")}
              className='absolute left-[30px] top-[16px] h-5 w-5'
            />
          </Pressable>
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
