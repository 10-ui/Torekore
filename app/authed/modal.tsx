import "react-native-get-random-values";
import { nanoid } from "nanoid";
import {
  View,
  Share,
  Pressable,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import QRCode from "react-native-qrcode-svg";
import ExpoImage from "@/components/expo-image";
import { useCardInfoStore } from "@/utils/store";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/providers/supabaseAuth";

export default function Modal() {
  const { uniqueID } = useCardInfoStore();
  const setUniqueID = useCardInfoStore((state) => state.setUniqueID);
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const appLogo = require("@/assets/icon_rounded.png");
  const viewShot = useRef<ViewShot>(null);

  const capture = useCallback(async () => {
    try {
      const uri = await captureRef(viewShot);
      await MediaLibrary.saveToLibraryAsync(uri);
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

  const updateUniqueID = useCallback(async () => {
    setLoading(true);
    try {
      const newUniqueID = nanoid(10);

      const { error } = await supabase
        .from("cards")
        .update({ unique_id: newUniqueID })
        .eq("author_id", session!.user.id);

      if (error) {
        throw error;
      }

      setUniqueID(newUniqueID);
    } catch (error) {
      console.error("Error updating uniqueID:", error);
      Alert.alert("エラー", "ユニークIDの更新に失敗しました。");
    } finally {
      setLoading(false);
    }
  }, [session, setUniqueID]);

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
          onPress={updateUniqueID}>
          <ExpoImage
            source={require("@/assets/icons/share/reload.svg")}
            className='h-4 w-4'
          />
          {loading ? (
            <ActivityIndicator size='small' color='#000' />
          ) : (
            <Text className='text-lg'>更新</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
