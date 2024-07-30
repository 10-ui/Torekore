import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, Dimensions } from "react-native";
import { Camera, CameraView, BarcodeScanningResult } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "@/utils/supabase";
import { Card, SNS, StoredCard } from "@/utils/interface";
import { useUserStateStore } from "@/utils/store";
import { useAuth } from "@/providers/supabaseAuth";
import { cssInterop } from "nativewind";

const { width, height } = Dimensions.get("window");
const SCAN_AREA_SIZE = width * 0.7;
cssInterop(CameraView, { className: "style" });

export default function ShareCard() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const { missions, setMissions } = useUserStateStore();
  const { session } = useAuth();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({
    bounds,
    data,
  }: BarcodeScanningResult): Promise<void> => {
    const { origin, size } = bounds;
    const scanAreaLeft = (width - SCAN_AREA_SIZE) / 2;
    const scanAreaTop = (height - SCAN_AREA_SIZE) / 2;
    const scanAreaRight = scanAreaLeft + SCAN_AREA_SIZE;
    const scanAreaBottom = scanAreaTop + SCAN_AREA_SIZE;

    if (
      origin.x >= scanAreaLeft &&
      origin.y >= scanAreaTop &&
      origin.x + size.width <= scanAreaRight &&
      origin.y + size.height <= scanAreaBottom
    ) {
      setScanned(true);
      try {
        await fetchCardData(data);
      } catch (error) {
        handleScanError(error);
      }
    }
  };

  const fetchCardData = async (uniqueId: string): Promise<void> => {
    const { data: cardWithSNS, error } = await supabase
      .from("cards")
      .select(`*, sns:sns(*)`)
      .eq("unique_id", uniqueId)
      .single();

    if (error) throw new Error(`データの取得エラー: ${error.message}`);
    if (!cardWithSNS) throw new Error("有効なカードが見つかりませんでした。");

    const newCard = processCardData(cardWithSNS);
    await saveCardData(newCard);
    await updateMissionStatus();
  };

  const processCardData = (cardWithSNS: any): StoredCard => {
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

    return { ...card, sns };
  };

  const saveCardData = async (newCard: StoredCard): Promise<void> => {
    const storedCards = await getStoredCards();
    const updatedCards = updateStoredCards(storedCards, newCard);
    await AsyncStorage.setItem("scannedCards", JSON.stringify(updatedCards));
  };

  const updateMissionStatus = async (): Promise<void> => {
    const missionTitle = "はじまりの証";
    const updatedMissions = missions.map((mission) =>
      mission.title === missionTitle
        ? { ...mission, isCompleted: true }
        : mission,
    );
    setMissions(updatedMissions);

    const { error: missionError } = await supabase.from("medals").upsert(
      {
        medal_id: missionTitle,
        is_completed: true,
        author_id: session?.user.id,
      },
      { onConflict: "medal_id, author_id" },
    );

    if (missionError) {
      throw new Error(`ミッション更新エラー: ${missionError.message}`);
    }

    Alert.alert(
      "成功",
      "カードが正常にスキャンされ、「はじまりの証」ミッションが完了しました。",
    );
  };

  const handleScanError = (error: unknown): void => {
    console.error("カードのスキャン中にエラーが発生しました:", error);
    Alert.alert(
      "エラー",
      `カードのスキャン中にエラーが発生しました: ${(error as Error).message}`,
    );
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
    return (
      <Text className='text-center text-red-500'>
        カメラへのアクセスが許可されていません。
      </Text>
    );
  }

  return (
    <View className='flex-1'>
      <CameraView
        className='flex-1'
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}>
        <View className='flex-1 items-center justify-center'>
          <View className='absolute inset-0 bg-black/80' />
          <View
            style={{
              width: SCAN_AREA_SIZE,
              height: SCAN_AREA_SIZE,
            }}
            className='overflow-hidden rounded-3xl border-4 border-white'>
            <View className='absolute inset-0 m-1 rounded-2xl border-2 border-white' />
          </View>
        </View>
      </CameraView>
      {scanned && (
        <TouchableOpacity
          className='absolute bottom-12 left-12 right-12 items-center rounded-lg bg-white py-4'
          onPress={() => setScanned(false)}>
          <Text className='text-lg font-semibold text-black'>再スキャン</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
