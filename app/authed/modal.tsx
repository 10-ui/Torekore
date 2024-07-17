import { View, Share, Pressable, Text, Alert } from "react-native";
import React, { useCallback, useRef, useEffect, useState } from "react";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import QRCode from "react-native-qrcode-svg";
import ExpoImage from "@/components/expo-image";
import { useUserStateStore } from "@/utils/store";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

export default function Modal() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { uniqueID } = useUserStateStore();
  const setUniqueID = useUserStateStore((state) => state.setUniqueID);
  const appLogo = require("@/assets/icon_rounded.png");
  const viewShot = useRef<ViewShot>(null);
  useEffect(() => {
    setUniqueID(nanoid(10));
    setIsLoaded(true);
  }, []);
  const capture = useCallback(async () => {
    try {
      const uri = captureRef(viewShot);
      MediaLibrary.saveToLibraryAsync(await uri);
      console.log(uri);
      Alert.alert("画像の保存完了");
    } catch (error) {
      console.error(error);
    }
  }, []);
  const shareQrcode = useCallback(async () => {
    try {
      const uri: string = await captureRef(viewShot);
      await Share.share({
        url: uri,
      });
    } catch (error: any) {
      console.error("Error sharing:", error.message);
    }
  }, []);
  if (!isLoaded) return null;
  return (
    <View className='flex-1 bg-white p-20 shadow-md'>
      <View className='flex items-center gap-4'>
        <ViewShot ref={viewShot}>
          <QRCode value={uniqueID} size={180} logo={appLogo} />
        </ViewShot>
        <View className='my-10 flex flex-row items-center justify-center gap-15'>
          <Pressable className='flex items-center gap-1' onPress={shareQrcode}>
            <ExpoImage
              source={require("@/assets/icons/share/share.svg")}
              className='h-10 w-10'
            />
            <Text>シェア</Text>
          </Pressable>
          <Pressable className='flex items-center gap-1' onPress={capture}>
            <ExpoImage
              source={require("@/assets/icons/share/save.svg")}
              className='h-10 w-10'
            />
            <Text>保存</Text>
          </Pressable>
        </View>
        <Pressable
          className='mt-10 flex flex-row items-center gap-1 rounded-lg border border-input px-4 py-2'
          onPress={() => setUniqueID(nanoid(10))}>
          <ExpoImage
            source={require("@/assets/icons/share/reload.svg")}
            className='h-4 w-4'
          />
          <Text className='text-lg'>更新</Text>
        </Pressable>
      </View>
    </View>
  );
}
