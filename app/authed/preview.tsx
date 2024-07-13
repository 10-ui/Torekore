import React, { useCallback, useRef } from "react";
import { View, Alert, Share } from "react-native";
import CardView from "@/components/card/card-view";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import { Button } from "@/components/button";

export default function Preview() {
  const viewShot = useRef<ViewShot>(null);
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
  const shareCard = useCallback(async () => {
    try {
      const uri: string = await captureRef(viewShot);
      await Share.share({
        url: uri,
      });
    } catch (error: any) {
      console.error("Error sharing:", error.message);
    }
  }, []);
  return (
    <View className='w-full flex-1 bg-appBG px-4 pt-20'>
      <ViewShot ref={viewShot}>
        <CardView />
      </ViewShot>
      <View className='mt-9 flex w-full flex-row items-center justify-center gap-4'>
        <Button
          onPress={capture}
          label='画像を保存'
          variant='outline'
          className='flex-1'
        />
        <Button onPress={shareCard} label='カードをシェア' className='flex-1' />
      </View>
    </View>
  );
}
