import { useState } from "react";
import {
  Text,
  View,
  Pressable,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
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

type BGImage = {
  name: string;
  src: string;
  url: string;
};

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

      // 画像の元のサイズを取得
      const { width, height } = await ImageManipulator.manipulateAsync(
        uri,
        [],
        { format: ImageManipulator.SaveFormat.JPEG },
      );

      // 16:9のアスペクト比を維持しつつ、元の画像に収まるようにクロップサイズを計算
      let cropWidth = width;
      let cropHeight = (width / 16) * 9;

      if (cropHeight > height) {
        cropHeight = height;
        cropWidth = (height / 9) * 16;
      }

      const originX = (width - cropWidth) / 2;
      const originY = (height - cropHeight) / 2;

      // ImageManipulatorを使用して16:9にクロップ
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [
          {
            crop: {
              originX,
              originY,
              width: cropWidth,
              height: cropHeight,
            },
          },
        ],
        { format: ImageManipulator.SaveFormat.JPEG },
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
        console.error("Supabaseアップロードエラー:", error);
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
        console.error("データベース更新エラー:", upsertError);
        throw upsertError;
      }

      setBackgroundImage(publicUrl);
      Alert.alert("成功", "背景画像が正常にアップロードされました。");
    } catch (error) {
      console.error("エラーの詳細:", error);
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

  const handleBackgroundSelect = async (bgImage: BGImage) => {
    if (!session?.user?.id) {
      Alert.alert("エラー", "ユーザーが認証されていません。");
      return;
    }

    try {
      const { error: upsertError } = await supabase
        .from("cards")
        .update({ background_url: bgImage.url })
        .eq("author_id", session.user.id);

      if (upsertError) {
        throw upsertError;
      }

      setBackgroundImage(bgImage.src);
    } catch (error) {
      Alert.alert(
        "エラー",
        `背景画像の設定に失敗しました: ${error || "不明なエラー"}`,
      );
    }
  };

  return (
    <View className='w-full space-y-7'>
      <CardView />
      <View className='mt-7 border border-input bg-white px-3 py-4'>
        <Text className='mb-4'>背景</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className='flex flex-row gap-2'>
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
            {bgImageData.map((bgImage: BGImage) => (
              <Pressable
                key={bgImage.name}
                onPress={() => handleBackgroundSelect(bgImage)}>
                <ExpoImage
                  source={bgImage.src}
                  className={docking(
                    "h-14 w-23 border border-input",
                    bgImage.url === backgroundImage
                      ? "border-2 border-appBlue"
                      : "border-input",
                  )}
                />
              </Pressable>
            ))}
          </View>
        </ScrollView>
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
