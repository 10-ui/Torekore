import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Text>Hello World</Text>
      <Link className='text-2xl font-bold text-slate-600' href='/authed'>
        Home
      </Link>
    </View>
  );
}
