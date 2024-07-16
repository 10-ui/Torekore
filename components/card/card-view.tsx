import { Text, View, Pressable, Linking } from "react-native";
import ExpoImage from "@/components/expo-image";
import { useCardInfoStore } from "@/utils/store";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { docking } from "@/utils/docking";
import { usePathname } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function CardView() {
  const { iconImage, backgroundImage, snsInfo, name, doubleName, medals } =
    useCardInfoStore();
  const setIconImage = useCardInfoStore((state) => state.setIconImage);
  const path = usePathname();
  const onCropImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setIconImage(result.assets[0].uri);
    }
  };
  return (
    <View className='relative h-60 w-full border border-input'>
      <ExpoImage
        source={backgroundImage}
        className='absolute left-0 top-0 -z-20 h-full w-full'
      />
      <View className='mx-auto flex h-full w-9/12 flex-col items-center justify-center'>
        <Text className='mr-auto text-xl font-semibold'>{doubleName}</Text>
        <View className='mr-auto mt-5 flex flex-row items-start gap-x-6'>
          <Avatar className='h-25 w-25'>
            {iconImage && <AvatarImage source={iconImage} />}

            <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
            {path === "/authed/editCard" && (
              <Pressable
                className='absolute bottom-0 left-0 flex h-6 w-full items-center justify-center bg-white/50'
                onPress={onCropImage}>
                <Text>編集</Text>
              </Pressable>
            )}
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
                  index !== 0 ? "mt-1.5" : "",
                  "flex flex-row items-center gap-1.5",
                )}>
                <ExpoImage source={sns.src} className='h-6 w-6' />
                <Pressable
                  onPress={() => Linking.openURL(sns.baseLink + sns.userId)}>
                  {sns.userId && (
                    <Text className='text-base'>
                      @
                      {sns.name === "discord"
                        ? sns.userId.slice(19, 30)
                        : sns.name === "line"
                          ? sns.userId.slice(21, 35)
                          : sns.userId}
                    </Text>
                  )}
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
