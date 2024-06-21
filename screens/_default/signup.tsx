import React from "react";
import { View, Text, StyleSheet } from "react-native";
// Tailwindコンポーネントのインポート
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Image } from "expo-image";

export default function Signup({ navigation }: { navigation: any }) {
  return (
    <View className="flex-1 items-center justify-center bg-white px-13">
      <Image
        source={require("@/assets/logos/applogo.svg")}
        style={{ width: 150, height: 45, padding: 20, marginBottom:50}}
      />
      <Input
        label="メールアドレス"
        placeholder="メールアドレスを入力してください"
        className="mb-4"
        style={{ marginBottom: 0 }}
      />
      <Input
        label="パスワード"
        placeholder="パスワードを入力してください"
        style={{ marginBottom: 0 }}
      />
      <Button
        label="登録"
        variant="outline"
        onPress={() => {
          navigation.navigate("Login");
        }}
        className="mb-4"
        style={{ marginBottom: 20 }}
      />
      <Image
        source={require("@/assets/logos/google.svg")}
        style={{ width: 280, height: 50, marginBottom: 10 }}
      />
      <Image
        source={require("@/assets/logos/X.svg")}
        style={{ width: 280, height: 50, }}
      />
      <Button label="ログインはこちら" className="mb-4" />
    </View>
  );
}
