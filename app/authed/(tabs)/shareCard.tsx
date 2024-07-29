import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Camera, CameraView, BarcodeScanningResult } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "@/utils/supabase";
import { Card, SNS, StoredCard } from "@/utils/interface";

export default function ShareCard() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({
    data,
  }: BarcodeScanningResult): Promise<void> => {
    setScanned(true);
    try {
      const { data: cardWithSNS, error } = await supabase
        .from("cards")
        .select(
          `
          *,
          sns:sns(*)
        `,
        )
        .eq("unique_id", data)
        .single();

      if (error) throw new Error(`データの取得エラー: ${error.message}`);

      if (cardWithSNS) {
        const card: Card = {
          id: cardWithSNS.id,
          author_id: cardWithSNS.author_id,
          unique_id: cardWithSNS.unique_id,
          name: cardWithSNS.name,
          double_name: cardWithSNS.double_name,
          avatar_url: cardWithSNS.avatar_url,
          background_url: cardWithSNS.background_url,
          font_name: cardWithSNS.font_name,
          created_at: cardWithSNS.created_at,
          updated_at: cardWithSNS.updated_at,
        };

        const sns: SNS[] = cardWithSNS.sns
          .sort(
            (a: SNS, b: SNS) =>
              new Date(b.updated_at || b.created_at).getTime() -
              new Date(a.updated_at || a.created_at).getTime(),
          )
          .slice(0, 4);

        const newCard: StoredCard = {
          ...card,
          sns: sns,
        };

        const storedCards = await getStoredCards();
        const updatedCards = updateStoredCards(storedCards, newCard);
        await AsyncStorage.setItem(
          "scannedCards",
          JSON.stringify(updatedCards),
        );

        Alert.alert("成功", "カードが正常にスキャンされました。");
      } else {
        Alert.alert("エラー", "有効なカードが見つかりませんでした。");
      }
    } catch (error) {
      console.error("カードのスキャン中にエラーが発生しました:", error);
      Alert.alert(
        "エラー",
        `カードのスキャン中にエラーが発生しました: ${(error as Error).message}`,
      );
    }
  };

  const getStoredCards = async (): Promise<StoredCard[]> => {
    const storedCardsJson = await AsyncStorage.getItem("scannedCards");
    return storedCardsJson ? JSON.parse(storedCardsJson) : [];
  };

  const updateStoredCards = (
    storedCards: StoredCard[],
    newCard: StoredCard,
  ): StoredCard[] => {
    const existingCardIndex = storedCards.findIndex(
      (card) => card.author_id === newCard.author_id,
    );
    if (existingCardIndex !== -1) {
      storedCards[existingCardIndex] = newCard;
    } else {
      storedCards.push(newCard);
    }
    return storedCards;
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
