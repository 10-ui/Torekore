import Sns from "@/components/card/sns";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import CardView from "@/components/card/card-view";
import { useCardInfoStore } from "@/utils/store";
import { router } from "expo-router";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import DoubleName from "@/components/card/double-name";

export default function CardInfo() {
  const setName = useCardInfoStore((state) => state.setName);

  const handleNameChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const newName = e.nativeEvent.text;
    setName(newName);
  };

  return (
    <>
      <CardView />
      <Input
        containerClasses='mt-4'
        placeholder='名前'
        variant='card'
        onChange={handleNameChange}
      />
      <Sns />
      <DoubleName />
      <Button
        label='保存してプレビュー'
        className='mt-6'
        onPress={() => router.push("/authed/preview")}
      />
    </>
  );
}
