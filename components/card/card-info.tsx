import React, { useCallback, useRef } from "react";
import Sns from "@/components/card/sns";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import CardView from "@/components/card/card-view";
import { useCardInfoStore } from "@/utils/store";
import {
  Alert,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import DoubleName from "@/components/card/double-name";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";

export default function CardInfo() {
  const setName = useCardInfoStore((state) => state.setName);
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

  const handleNameChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const newName = e.nativeEvent.text;
    setName(newName);
  };

  return (
    <>
      <ViewShot ref={viewShot}>
        <CardView />
      </ViewShot>
      <Input
        containerClasses='mt-4'
        placeholder='名前'
        variant='card'
        onChange={handleNameChange}
      />
      <Sns />
      <DoubleName />
      <Button label='保存してプレビュー' className='mt-6' onPress={capture} />
    </>
  );
}
