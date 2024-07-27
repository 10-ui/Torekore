import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";
import ExpoImage from "@/components/expo-image";
import { useCardInfoStore, useUserStateStore } from "@/utils/store";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { docking } from "@/utils/docking";
import { usePathname } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/providers/supabaseAuth";
import { nanoid } from "nanoid";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";

export default function CardView() {
  const { avatarUrl, backgroundImage, snsInfo, name, doubleName } =
    useCardInfoStore();
  const { missions } = useUserStateStore();
  const setAvatarUrl = useCardInfoStore((state) => state.setAvatarUrl);
  const path = usePathname();
  const { session } = useAuth();
  const [localAvatarUrl, setLocalAvatarUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (avatarUrl) {
      setLocalAvatarUrl(avatarUrl);
    }
  }, [avatarUrl]);

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
        aspect: [1, 1],
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
        [{ resize: { width: 300, height: 300 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG },
      );

      const resizedUri = manipulatedImage.uri;

      const fileContent = await FileSystem.readAsStringAsync(resizedUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileName = `${nanoid(10)}.jpg`;
      const filePath = `${session.user.id}/avatar/${fileName}`;

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

      const { error: updateError } = await supabase
        .from("cards")
        .update({ avatar_url: publicUrl })
        .eq("author_id", session.user.id);

      if (updateError) {
        throw updateError;
      }

      setAvatarUrl(publicUrl);
      setLocalAvatarUrl(publicUrl);
      Alert.alert("成功", "画像が正常にアップロードされました。");
    } catch (error) {
      Alert.alert(
        "エラー",
        `画像のアップロードに失敗しました: ${error || "不明なエラー"}`,
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
    <View
      className={docking(
        "relative h-60 w-full border border-input",
        path === "/authed/preview" ? "border-none" : "",
      )}>
      {backgroundImage && (
        <ExpoImage
          source={backgroundImage}
          className='absolute left-0 top-0 -z-20 h-full w-full'
        />
      )}
      <View className='mx-auto mt-4 flex h-full w-10/12 flex-col'>
        <Text className='mr-auto text-xl font-semibold'>
          {doubleName?.replace(" ", "") || ""}
        </Text>
        <View className='mr-auto mt-5 flex flex-row items-start gap-x-6'>
          <Avatar className='h-25 w-25'>
            {localAvatarUrl ? (
              <AvatarImage
                source={{ uri: localAvatarUrl }}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <AvatarFallback>{name?.slice(0, 2) || ""}</AvatarFallback>
            )}
            {path === "/authed/editCard" && (
              <Pressable
                className='absolute bottom-0 left-0 flex h-6 w-full items-center justify-center bg-white/50'
                onPress={onCropImage}
                disabled={isUploading}>
                {isUploading ? (
                  <ActivityIndicator size='small' color='#000000' />
                ) : (
                  <Text>編集</Text>
                )}
              </Pressable>
            )}
          </Avatar>
          <View className='flex flex-col'>
            <View className='mb-4 flex flex-row items-center gap-x-3'>
              <Text className='text-2xl'>{name || ""}</Text>
              <View className='flex flex-row gap-x-1'>
                {missions?.map((mission, index) =>
                  mission.source !==
                  require("@/assets/icons/mission/empty.png") ? (
                    <ExpoImage
                      key={`mission-${index}`}
                      source={mission.source}
                      className='h-6 w-6'
                    />
                  ) : null,
                )}
              </View>
            </View>
            {snsInfo?.map((sns, index) => (
              <View
                key={`sns-${index}`}
                className={docking(
                  index !== 0 ? "mt-1.5" : "",
                  "flex flex-row items-center gap-1.5",
                )}>
                {sns.source !== require("@/assets/logos/sns/empty.png") && (
                  <ExpoImage source={sns.source} className='h-6 w-6' />
                )}
                {sns.userId && (
                  <Pressable
                    onPress={() => Linking.openURL(sns.baseLink + sns.userId)}>
                    <Text className='text-base'>
                      @
                      {sns.name === "discord"
                        ? sns.userId.slice(19, 30)
                        : sns.name === "line"
                          ? sns.userId.slice(21, 35)
                          : sns.userId}
                    </Text>
                  </Pressable>
                )}
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
