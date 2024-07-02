import React from "react";
import { View, Text, StyleSheet } from "react-native";
// Tailwindコンポーネントのインポート
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import ExpoImage from "@/components/expo-image";
import { Divider } from "@/components/divider";
import { Link } from "expo-router";

export default function Signup() {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(true);
  return (
    <View className='flex-1 items-center justify-center bg-white px-13'>
      <ExpoImage
        source={require("@/assets/logos/applogo.svg")}
        className='mb-4 h-[45px] w-[150px]'
      />
      <Input
        keyboardType='email-address'
        textContentType='emailAddress'
        label='ログインID (メールアドレス)'
        placeholder='example@mail.com'
        className='mb-4'
      />
      <Input
        textContentType='password'
        label='パスワード'
        placeholder='英数字を含めた８文字以上'
        source={
          isPasswordVisible
            ? require("@/assets/icons/eye-off.svg")
            : require("@/assets/icons/eye.svg")
        }
        sourceOnPress={() => setIsPasswordVisible(!isPasswordVisible)}
        secureTextEntry={isPasswordVisible}
      />
      <Button label='登録' className='mt-9' />
      <Divider className='my-9' />
      <Button
        label='googleで連携'
        className='mb-4'
        variant='withicon'
        source={require("@/assets/logos/google.svg")}
      />
      <Button
        label='Xで連携'
        className='mb-4'
        variant='withicon'
        source={require("@/assets/logos/X.svg")}
      />
      <Link href='/login' className='mt-8 underline'>
        ログインはこちら
      </Link>
    </View>
  );
}
