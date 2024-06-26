import React from "react";
import { View, Text, StyleSheet } from "react-native";
// Tailwindコンポーネントのインポート
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import ExpoImage from "@/components/expo-image";

export default function Signup({ navigation }: { navigation: any }) {
  return (
    <View className='flex-1 items-center justify-center bg-white px-13'>
      <ExpoImage
        source={require("@/assets/logos/applogo.svg")}
        className='mb-4'
      />
      <Input
        label='メールアドレス'
        placeholder='メールアドレスを入力してください'
        className='mb-4'
        style={{ marginBottom: 0 }}
      />
      <Input
        label='パスワード'
        placeholder='パスワードを入力してください'
        style={{ marginBottom: 0 }}
        className='mb-4'
      />
      <Button
        label='登録'
        variant='outline'
        className='mb-4'
        style={{ marginBottom: 20 }}
      />
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

      <Button label='ログインはこちら' className='mb-4' />
    </View>
  );
}
