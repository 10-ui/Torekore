import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Button } from "@/components/button";
import { router } from "expo-router";
import { missiondata } from "@/utils/data/missiondata";
import { Text, View, ScrollView } from "react-native";
import CardView from "@/components/card/card-view";

export default function Home() {
  return (
    <ScrollView className='bg-white px-4 py-6'>
      <CardView />
      <Button
        label='カードをシェア'
        className='mt-6'
        onPress={() => router.push("/authed/modal")}
      />
      <View className='mt-6 w-full rounded-lg bg-appLightBlue p-5'>
        <Text className='pb-5 text-center text-lg font-medium'>ミッション</Text>
        {missiondata.map((item) => (
          <View key={item.id} className='mb-4 bg-white p-3'>
            <View className='flex flex-row items-center gap-2'>
              <Avatar className='h-10 w-10'>
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
                <Text className='text-xl'>{item.title}</Text>
                <Text className='text-base'>{item.description}</Text>
              </View>
            </View>
            <Button
              label='受け取る'
              variant='mission'
              className='mx-auto mt-4 h-8 w-2/5'
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
