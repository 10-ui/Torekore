import { Text, View, Pressable, Linking } from "react-native";
import ExpoImage from "@/components/expo-image";
import { useCardInfoStore, useUserStateStore } from "@/utils/store";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { docking } from "@/utils/docking";
import { usePathname } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function CardView() {
  const { avatarUrl, backgroundImage, snsInfo, name, doubleName } =
    useCardInfoStore();
  const { missions } = useUserStateStore();
  const setIconImage = useCardInfoStore((state) => state.setIconImage);
  const path = usePathname();

  const onCropImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setIconImage(result.assets[0].uri);
    }
  };

  return (
    <View
      className={docking(
        "relative h-60 w-full border border-input",
        path === "/authed/preview" ? "border-none" : "",
      )}>
      {backgroundImage && (
        <ExpoImage
          source={backgroundImage}
          className='absolute left-0 top-0 -z-20 h-full w-full'
        />
      )}
      <View className='mx-auto mt-4 flex h-full w-10/12 flex-col'>
        <Text className='mr-auto text-xl font-semibold'>
          {doubleName?.replace(" ", "") || ""}
        </Text>
        <View className='mr-auto mt-5 flex flex-row items-start gap-x-6'>
          <Avatar className='h-25 w-25'>
            {avatarUrl && <AvatarImage source={avatarUrl} />}
            <AvatarFallback>{name?.slice(0, 2) || ""}</AvatarFallback>
            {path === "/authed/editCard" && (
              <Pressable
                className='absolute bottom-0 left-0 flex h-6 w-full items-center justify-center bg-white/50'
                onPress={onCropImage}>
                <Text>編集</Text>
              </Pressable>
            )}
          </Avatar>
          <View className='flex flex-col'>
            <View className='mb-4 flex flex-row items-center gap-x-3'>
              <Text className='text-2xl'>{name || ""}</Text>
              <View className='flex flex-row gap-x-1'>
                {missions?.map((mission, index) =>
                  mission.source !==
                  require("@/assets/icons/mission/empty.png") ? (
                    <ExpoImage
                      key={`mission-${index}`}
                      source={mission.source}
                      className='h-6 w-6'
                    />
                  ) : null,
                )}
              </View>
            </View>
            {snsInfo?.map((sns, index) => (
              <View
                key={`sns-${index}`}
                className={docking(
                  index !== 0 ? "mt-1.5" : "",
                  "flex flex-row items-center gap-1.5",
                )}>
                {sns.source !== require("@/assets/logos/sns/empty.png") && (
                  <ExpoImage source={sns.source} className='h-6 w-6' />
                )}
                {sns.userId && (
                  <Pressable
                    onPress={() => Linking.openURL(sns.baseLink + sns.userId)}>
                    <Text className='text-base'>
                      @
                      {sns.name === "discord"
                        ? sns.userId.slice(19, 30)
                        : sns.name === "line"
                          ? sns.userId.slice(21, 35)
                          : sns.userId}
                    </Text>
                  </Pressable>
                )}
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
