import { Text, View, TouchableOpacity, Linking } from "react-native";
import ExpoImage from "@/components/expo-image";
import { useCardInfoStore } from "@/utils/store";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { docking } from "@/utils/docking";

export default function CardView() {
  const { backgroundImage, snsInfo, name, doubleName, medals } =
    useCardInfoStore();
  return (
    <View className='relative h-60 w-full'>
      <ExpoImage
        source={backgroundImage}
        className='absolute left-0 top-0 -z-20 h-full w-full'
      />
      <View className='flex h-full w-full flex-col items-center justify-center'>
        <View>
          <Text className='text-xl font-semibold'>{doubleName}</Text>
          <View className='mt-5 flex flex-row items-start gap-x-6'>
            <Avatar className='h-25 w-25'>
              <AvatarImage source={require("@/assets/sample.png")} />
              <AvatarFallback>
                <Text>{name.slice(0, 2)}</Text>
              </AvatarFallback>
            </Avatar>
            <View className='flex flex-col'>
              <View className='mb-4 flex flex-row'>
                <Text className='text-2xl'>{name}</Text>
                <Text className='text-base font-semibold'>{medals}</Text>
              </View>
              {snsInfo.map((sns, index) => (
                <View
                  key={index}
                  className={docking(
                    index !== 0 ? "mt-2" : "",
                    "flex flex-row items-center gap-2",
                  )}>
                  <ExpoImage source={sns.src} className='h-6 w-6' />
                  <TouchableOpacity
                    onPress={() => Linking.openURL(sns.baseLink + sns.userId)}>
                    {sns.userId && (
                      <Text className='text-base'>@{sns.userId}</Text>
                    )}
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
