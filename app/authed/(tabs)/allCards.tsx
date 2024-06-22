import { Button } from "@/components/button";
import { View } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useState } from "react";

export default function AllCards() {
  const { showActionSheetWithOptions } = useActionSheet();
  const [label, setLabel] = useState("レベルが高い順");
  const handleSort = () => {
    const options = ["レベルが高い順", "古い順", "新しい順", "キャンセル"];
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            // レベルが高い順
            setLabel("レベルが高い順");
            break;

          case 1:
            // 古い順
            setLabel("古い順");
            break;

          case 2:
            // 新しい順
            setLabel("新しい順");
            break;

          case cancelButtonIndex:
          // Canceled
        }
      },
    );
  };
  return (
    <View className='flex-1 items-center bg-white p-4'>
      <Button
        variant='outline'
        className='ml-auto h-10 w-40'
        label={label}
        onPress={handleSort}
      />
    </View>
  );
}
