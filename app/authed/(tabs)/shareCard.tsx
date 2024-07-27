import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Camera, CameraView, BarcodeScanningResult } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "@/utils/supabase";

export default function ShareCard() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }: BarcodeScanningResult) => {
    setScanned(true);
    try {
      // QRコードから読み取ったuniqueIDでカードを検索
      const { data: cardData, error } = await supabase
        .from("cards")
        .select("id")
        .eq("unique_id", data)
        .single();

      if (error) throw error;

      if (cardData) {
        // 既存のスキャンされたカードIDを取得
        const existingCardIds = await AsyncStorage.getItem("scannedCardIds");
        let cardIds = existingCardIds ? JSON.parse(existingCardIds) : [];

        // 新しいカードIDを追加（重複を避ける）
        if (!cardIds.includes(cardData.id)) {
          cardIds.push(cardData.id);
          // 更新されたカードID配列を保存
          await AsyncStorage.setItem("scannedCardIds", JSON.stringify(cardIds));
        }

        Alert.alert("成功", "カードが正常にスキャンされました。");
      } else {
        Alert.alert("エラー", "有効なカードが見つかりませんでした。");
      }
    } catch (error) {
      console.error("Error scanning card:", error);
      Alert.alert("エラー", "カードのスキャン中にエラーが発生しました。");
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>カメラへのアクセスが許可されていません。</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}>
        <View style={styles.overlay}>
          <View style={styles.scanArea} />
        </View>
      </CameraView>
      {scanned && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setScanned(false)}>
          <Text style={styles.buttonText}>再スキャン</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "transparent",
  },
  button: {
    position: "absolute",
    bottom: 50,
    left: 50,
    right: 50,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "black",
  },
});
