import { useState } from "react";
import { Text, View, Pressable, Alert, ActivityIndicator } from "react-native";
import ExpoImage from "@/components/expo-image";
import CardView from "@/components/card/card-view";
import { Button } from "@/components/button";
import { useCardInfoStore } from "@/utils/store";
import fontNameData from "@/utils/data/fontnamedata";
import bgImageData from "@/utils/data/bgimagedata";
import { docking } from "@/utils/docking";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { supabase } from "@/utils/supabase";
import { nanoid } from "nanoid";
import { useAuth } from "@/providers/supabaseAuth";
import * as FileSystem from "expo-file-system";
import { handleSave } from "@/utils/handleSave";

export default function CardStyle() {
  const { fontName, backgroundImage } = useCardInfoStore();
  const setFontName = useCardInfoStore((state) => state.setFontName);
  const setBackgroundImage = useCardInfoStore(
    (state) => state.setBackgroundImage,
  );
  const [isOpened, setIsOpened] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { session } = useAuth();

  const onCropImage = async () => {
    if (!session?.user?.id) {
      Alert.alert("エラー", "ユーザーが認証されていません。");
      return;
    }

    setIsUploading(true);

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });

      if (result.canceled) {
        setIsUploading(false);
        return;
      }

      if (!result.assets || result.assets.length === 0) {
        throw new Error("画像の選択に失敗しました");
      }

      const uri = result.assets[0].uri;

      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 1600, height: 900 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG },
      );

      const resizedUri = manipulatedImage.uri;

      const fileContent = await FileSystem.readAsStringAsync(resizedUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileName = `${nanoid(10)}.jpg`;
      const filePath = `${session.user.id}/background/${fileName}`;

      const { data, error } = await supabase.storage
        .from("userImages")
        .upload(filePath, decode(fileContent), {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (error) {
        throw error;
      }

      const { data: urlData } = supabase.storage
        .from("userImages")
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;

      const { error: upsertError } = await supabase
        .from("cards")
        .update({ background_url: publicUrl })
        .eq("author_id", session.user.id);

      if (upsertError) {
        throw upsertError;
      }

      setBackgroundImage(publicUrl);
      Alert.alert("成功", "背景画像が正常にアップロードされました。");
    } catch (error) {
      Alert.alert(
        "エラー",
        `背景画像のアップロードに失敗しました: ${error || "不明なエラー"}`,
      );
    } finally {
      setIsUploading(false);
    }
  };

  function decode(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

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
            disabled={isUploading}
            className='relative h-14 w-23 border border-input'>
            {isUploading ? (
              <ActivityIndicator
                size='small'
                color='#000000'
                style={{ position: "absolute", left: 30, top: 16 }}
              />
            ) : (
              <ExpoImage
                source={require("@/assets/logos/camera.png")}
                className='absolute left-[30px] top-[16px] h-5 w-5'
              />
            )}
          </Pressable>
        </View>
      </View>
      <View className='mt-6 flex flex-row items-start justify-between border border-input bg-white px-4 py-3'>
        <Text className='mr-7 text-base'>フォント</Text>
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
      <Button
        label='保存してプレビュー'
        className='mt-6'
        onPress={() => handleSave(session)}
      />
    </View>
  );
}
