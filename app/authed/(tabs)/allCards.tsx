import React, { useState, useCallback } from "react";
import { View, ScrollView, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import AsyncedCard from "@/components/storage/asyncedCard";
import { StoredCard } from "@/utils/interface";
import bgImageData from "@/utils/data/bgimagedata";

export default function AllCards(): JSX.Element {
  const [storedCards, setStoredCards] = useState<StoredCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchStoredCards = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const storedCardsJson = await AsyncStorage.getItem("scannedCards");
      if (storedCardsJson) {
        const cards: StoredCard[] = JSON.parse(storedCardsJson);
        const processedCards = cards.map((card) => ({
          ...card,
          background_url:
            bgImageData.find((bg) => bg.url === card.background_url)?.src ||
            bgImageData[0].src,
        }));
        setStoredCards(processedCards);
      } else {
        setStoredCards([]);
      }
    } catch (error) {
      console.error("カードの取得中にエラーが発生しました:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchStoredCards();
    }, [fetchStoredCards]),
  );

  if (isLoading) {
    return (
      <View className='flex-1 items-center justify-center'>
        <Text className='text-base'>読み込み中...</Text>
      </View>
    );
  }

  // author_idでカードをグループ化
  const groupedCards = storedCards.reduce(
    (acc, card) => {
      if (!acc[card.author_id]) {
        acc[card.author_id] = [];
      }
      acc[card.author_id].push(card);
      return acc;
    },
    {} as Record<string, StoredCard[]>,
  );

  return (
    <ScrollView className='flex-1'>
      {Object.entries(groupedCards).length > 0 ? (
        Object.entries(groupedCards).map(([authorId, cards]) => (
          <View key={authorId} className='mb-5'>
            <AsyncedCard cards={cards} />
          </View>
        ))
      ) : (
        <Text className='mt-5 text-center text-base'>
          保存されたカードはありません。
        </Text>
      )}
    </ScrollView>
  );
}
