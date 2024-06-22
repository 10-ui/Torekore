import { Button } from "@/components/button";
import { View, Text } from "react-native";

export default function AllCards() {
  return (
    <View className='flex-1 items-center p-4 bg-white'>
      <Button variant='outline' className=" w-40 h-10 ml-auto" label='レベルが高い順' />
    </View>
  );
}
