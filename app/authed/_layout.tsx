import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen
        name='modal'
        options={{
          presentation: "modal",
          header: () => {
            return (
              <View className='relative flex flex-row items-center justify-center bg-white p-6'>
                <Text className='text-xl font-bold'>カードをシェア</Text>
                <Link href='../' asChild className='absolute right-6'>
                  <Ionicons name='close-outline' size={32} color='black' />
                </Link>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name='preview'
        options={{
          title: "プレビュー",
          headerBackTitle: "編集画面へ",
        }}
      />
    </Stack>
  );
}
