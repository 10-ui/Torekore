import { useState } from "react";
import { View, KeyboardAvoidingView } from "react-native";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import ExpoImage from "@/components/expo-image";
import { Divider } from "@/components/divider";
import { Link, router } from "expo-router";
import { supabase } from "@/utils/supabase";

export default function Signup() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      router.replace("/login");
    }
  };
  return (
    <KeyboardAvoidingView
      behavior='position'
      className='flex-1 items-center justify-center bg-white'>
      <View className='w-screen px-13'>
        <ExpoImage
          source={require("@/assets/logos/app/appLogo.svg")}
          className='mb-4 h-[45px] w-[150px]'
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
          placeholder='英数字を含めた８文字以上'
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
        <Button label='登録' className='mt-9' onPress={handleSignup} />
        <Divider className='my-9' />
        <Button
          label='googleで連携'
          className='mb-4'
          variant='withicon'
          source={require("@/assets/logos/sns/google.svg")}
        />
        <Button
          label='Xで連携'
          className='mb-4'
          variant='withicon'
          source={require("@/assets/logos/sns/X.svg")}
        />
        <Link href='/login' className='mt-8 text-center underline'>
          ログインはこちら
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}
