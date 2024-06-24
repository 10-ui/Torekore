import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Button } from "@/components/button";
import { router } from "expo-router";
import { Text, View, ScrollView } from "react-native";

const data = [
  {
    id: "1",
    title: "勇敢な証",
    description: "5人とカードを交換しよう",
  },
  {
    id: "2",
    title: "グローバル！",
    description: "国籍の異なる人とカードを交換しよう",
  },
  {
    id: "3",
    title: "グローバル！",
    description: "国籍の異なる人とカードを交換しよう",
  },
  {
    id: "4",
    title: "グローバル！",
    description: "国籍の異なる人とカードを交換しよう",
  },
  {
    id: "5",
    title: "グローバル！",
    description: "国籍の異なる人とカードを交換しよう",
  },
  {
    id: "6",
    title: "グローバル！",
    description: "国籍の異なる人とカードを交換しよう",
  },
];

export default function Home() {
  return (
    <ScrollView className='bg-white px-4 py-6'>
      <View className='h-60 w-full bg-slate-500'></View>
      <Button
        label='カードをシェア'
        className='mt-6'
        onPress={() => router.push("/authed/modal")}
      />
      <View className='mt-6 h-96 w-full rounded-lg bg-appLightBlue p-5'>
        <Text className='pb-5 text-center text-lg font-medium'>ミッション</Text>
        <ScrollView>
          {data.map((item) => (
            <View
              key={item.id}
              className='mb-4 flex flex-row items-center gap-2 bg-white p-2'>
              <Avatar className='h-10 w-10'>
                <AvatarImage
                  source={{
                    uri: "https://hiyokoyarou.com/wp-content/uploads/2022/04/icon-cat.png",
                  }}
                />
                <AvatarFallback>CG</AvatarFallback>
              </Avatar>
              <View>
                <Text className='text-xl'>{item.title}</Text>
                <Text className='text-base'>{item.description}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
