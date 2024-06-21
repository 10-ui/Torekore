import { Button } from "@/components/button";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import { Input } from "@/components/input";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  return (
    <View className='flex-1 items-center justify-center bg-white px-13'>
      <Image
        source={require("@/assets/logos/applogo.svg")}
        style={{ width: 150, height: 45, marginBottom: 20}}
      />
      
      <Input
        label='ログインID (メールアドレス)'
        placeholder='メールアドレスを入力してください'
      />
      <Input label='パスワード' placeholder='パスワードを入力してください' />
      <Button label='ログイン' onPress={() => {}} />

      <Button
        label='初めて利用される方はこちら'
        variant='outline'
        onPress={() => {
          router.push("/signup");
        }}
      />
      <Image
        source={require("@/assets/logos/google.svg")}
        style={{ width: 280, height: 40}}
      />
     
      <Image
        source={require("@/assets/logos/X.svg")}
        style={{ width: 280, height: 50, marginTop: 10}}
      />
      
    </View>
  );
}
