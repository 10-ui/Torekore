import { View, Text } from "react-native";
import { icondataTop } from "@/utils/icondata";
import ExpoImage from "@/components/expo-image";

export default function Sns() {
  return (
    <View className='mt-2 flex flex-row items-start border border-input px-3 py-4'>
      <Text className='mr-9'>SNS</Text>
      <View className='mr-12 flex flex-col gap-y-8'>
        <View className='flex flex-row gap-x-3'>
          <ExpoImage
            source={require("@/assets/logos/empty.svg")}
            className='h-12.5 w-12.5'
          />
          <ExpoImage
            source={require("@/assets/logos/empty.svg")}
            className='h-12.5 w-12.5'
          />
          <ExpoImage
            source={require("@/assets/logos/empty.svg")}
            className='h-12.5 w-12.5'
          />
          <ExpoImage
            source={require("@/assets/logos/empty.svg")}
            className='h-12.5 w-12.5'
          />
        </View>
        <View className='flex flex-row gap-x-3'>
          {icondataTop.map((item) => (
            <ExpoImage
              key={item.name}
              source={item.src}
              className='h-12.5 w-12.5'
            />
          ))}
        </View>
        <View className='flex flex-row gap-x-3'>
          {icondataTop.map((item) => (
            <ExpoImage
              key={item.name}
              source={item.src}
              className='h-12.5 w-12.5'
            />
          ))}
        </View>
      </View>
    </View>
  );
}
