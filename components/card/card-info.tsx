import React, { useCallback, useRef } from "react";
import Sns from "@/components/card/sns";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import CardView from "@/components/card/card-view";
import { useCardInfoStore } from "@/utils/store";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import DoubleName from "@/components/card/double-name";
import ViewShot, { captureRef } from "react-native-view-shot";

export default function CardInfo() {
  const setName = useCardInfoStore((state) => state.setName);
  const viewShot = useRef<ViewShot>(null);

  const capture = useCallback(() => {
    try {
      const uri = captureRef(viewShot);
      console.log(uri);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <ViewShot ref={viewShot}>
        <CardView />
      </ViewShot>
      <Input
        containerClasses='mt-4'
        placeholder='名前'
        variant='card'
        onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
          setName(e.nativeEvent.text)
        }
      />
      <Sns />
      <DoubleName />
      <Button label='保存してプレビュー' className='mt-6' />
    </>
  );
}
