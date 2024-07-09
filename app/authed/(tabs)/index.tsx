import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Button } from "@/components/button";
import { router } from "expo-router";
import { missiondata } from "@/utils/data/missiondata";
import { Text, View, ScrollView } from "react-native";
import CardView from "@/components/card/card-view";

export default function Home() {
  return (
    <ScrollView className='bg-appBG w-full px-4 py-6'>
      <CardView />
      <Button
        label='カードをシェア'
        className='mt-6'
        onPress={() => router.push("/authed/modal")}
      />
      <View className='mt-6 w-full rounded-lg border border-input bg-appLightBlue p-5'>
        <Text className='pb-5 text-center text-lg font-medium'>ミッション</Text>
        {missiondata.map((item) => (
          <View
            key={item.id}
            className='mb-4 rounded-lg bg-white px-7 py-5 shadow-sm'>
            <View className='flex flex-row items-center justify-start gap-7'>
              <Avatar className='h-15 w-15 rounded-none'>
                <AvatarImage
                  source={
                    item.source
                      ? item.source
                      : {
                          uri: "https://hiyokoyarou.com/wp-content/uploads/2022/04/icon-cat.png",
                        }
                  }
                />
                <AvatarFallback>CG</AvatarFallback>
              </Avatar>
              <View>
                <Text className='mb-1 text-base'>{item.title}</Text>
                <Text className='mb-2 text-xs'>{item.description}</Text>
                <Button
                  label='受け取る'
                  variant={item.isComplete ? "default" : "mission"}
                  className='w-33.5 h-8'
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
