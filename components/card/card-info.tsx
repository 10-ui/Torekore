import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Sns from "@/components/card/sns";
import CardView from "@/components/card/card-view";
import DoubleName from "@/components/card/double-name";
import Medals from "@/components/card/medals";
import { useCardInfoStore } from "@/utils/store";
import { useAuth } from "@/providers/supabaseAuth";
import { handleSave } from "@/utils/handleSave";

export default function CardInfo() {
  const { name } = useCardInfoStore();
  const { session } = useAuth();
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
        value={name}
        onChange={handleNameChange}
      />
      <Sns />
      <DoubleName />
      <Medals />
      <Button
        label='保存してプレビュー'
        className='mt-6'
        onPress={() => handleSave(session)}
      />
    </>
  );
}
