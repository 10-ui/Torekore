import { Image } from "expo-image";
import { View, Text } from "react-native";
import ExpoImage from "../expo-image";

export default function Sns() {
  return (
    <View className='mt-2 flex flex-row items-start border border-input px-3 py-4'>
      <Text className='mr-9'>SNS</Text>
      <View className='mr-12 flex flex-row gap-3'>
        <ExpoImage
          source={require("@/assets/logos/instagram.svg")}
          className='h-12.5 w-12.5'
        />
        <ExpoImage
          source={require("@/assets/logos/discord.svg")}
          className='h-12.5 w-12.5'
        />
        <ExpoImage
          source={require("@/assets/logos/X.svg")}
          className='h-12.5 w-12.5'
        />
        <ExpoImage
          source={require("@/assets/logos/twitch.svg")}
          className='h-12.5 w-12.5'
        />
      </View>
    </View>
  );
}
