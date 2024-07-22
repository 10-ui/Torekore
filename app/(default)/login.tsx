import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView, View } from "react-native";
import { useState } from "react";
import { Divider } from "@/components/divider";
import ExpoImage from "@/components/expo-image";
import { supabase } from "@/utils/supabase";

export default function Login() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log(error);
    } else {
      router.replace("/authed");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior='position'
      className='flex-1 items-center justify-center bg-white'>
      <View className='w-screen px-13'>
        <ExpoImage
          source={require("@/assets/logos/app/appLogo.svg")}
          className='mx-auto mb-5 h-[45px] w-[150px]'
        />
        <Input
          keyboardType='email-address'
          textContentType='emailAddress'
          label='ログインID (メールアドレス)'
          placeholder='example@mail.com'
          className='mb-4'
          value={email}
          onChangeText={setEmail}
        />
        <Input
          textContentType='password'
          label='パスワード'
          placeholder='パスワードを入力'
          source={
            isPasswordVisible
              ? require("@/assets/icons/form/eye-off.svg")
              : require("@/assets/icons/form/eye.svg")
          }
          sourceOnPress={() => setIsPasswordVisible(!isPasswordVisible)}
          secureTextEntry={isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <Button label='ログイン' onPress={handleLogin} className='mt-8' />
        <Divider className='my-9' />
        <Button
          label='初めて利用の方はこちら'
          variant={"outline"}
          onPress={() => router.push("/signup")}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
