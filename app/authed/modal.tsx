import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { View, Text, Share } from "react-native";
import { Link } from "expo-router";
import { Button } from "@/components/button";
export default function Modal() {
  const shareText = async () => {
    try {
      await Share.share({
        message: "https://www.jec.ac.jp",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  return (
    <View className='flex-1 bg-white p-4'>
      <Link href='../' asChild className='text-right'>
        <Ionicons name='close-outline' size={48} color='black' />
      </Link>
      <Text className='pt-6 text-center text-3xl font-bold'>
        カードをシェア
      </Text>
      <Button label='カードをシェア' className='mt-6' onPress={shareText} />
    </View>
  );
}
