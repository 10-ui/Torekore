import React, { useState, useCallback, useMemo } from "react";
import { View, ScrollView, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import AsyncedCard from "@/components/storage/asyncedCard";
import { Button } from "@/components/button";
import { StoredCard } from "@/utils/interface";
import bgImageData from "@/utils/data/bgimagedata";

type SortOption = "古い順" | "新しい順";

export default function AllCards(): JSX.Element {
  const [storedCards, setStoredCards] = useState<StoredCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<SortOption>("古い順");
  const { showActionSheetWithOptions } = useActionSheet();

  const fetchStoredCards = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const storedCardsJson = await AsyncStorage.getItem("scannedCards");
      if (storedCardsJson) {
        const cards: StoredCard[] = JSON.parse(storedCardsJson);
        const processedCards = cards.map((card) => ({
          ...card,
          background_url: card.background_url!.startsWith("https://")
            ? card.background_url
            : bgImageData.find((bg) => bg.url === card.background_url)?.src ||
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

  const handleSort = useCallback(() => {
    const options: (SortOption | "キャンセル")[] = [
      "古い順",
      "新しい順",
      "キャンセル",
    ];
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex?: number) => {
        if (
          selectedIndex !== undefined &&
          selectedIndex !== cancelButtonIndex
        ) {
          setSortOption(options[selectedIndex] as SortOption);
        }
      },
    );
  }, [showActionSheetWithOptions]);

  const sortedCards = useMemo(() => {
    return [...storedCards].sort((a, b) => {
      switch (sortOption) {
        case "古い順":
          return (
            (new Date(a.created_at).getTime() || 0) -
            (new Date(b.created_at).getTime() || 0)
          );
        case "新しい順":
          return (
            (new Date(b.created_at).getTime() || 0) -
            (new Date(a.created_at).getTime() || 0)
          );
        default:
          return 0;
      }
    });
  }, [storedCards, sortOption]);

  const groupedCards = useMemo(() => {
    return sortedCards.reduce(
      (acc, card) => {
        if (!acc[card.author_id]) {
          acc[card.author_id] = [];
        }
        acc[card.author_id].push(card);
        return acc;
      },
      {} as Record<string, StoredCard[]>,
    );
  }, [sortedCards]);

  if (isLoading) {
    return (
      <View className='flex-1 items-center justify-center'>
        <Text className='text-base'>読み込み中...</Text>
      </View>
    );
  }

  return (
    <View className='flex-1 bg-appBG'>
      <View className='p-4'>
        <Button
          variant='outline'
          className='ml-auto h-10 w-40'
          label={sortOption}
          onPress={handleSort}
        />
      </View>
      <ScrollView className='flex-1 p-4'>
        {Object.entries(groupedCards).length > 0 ? (
          Object.entries(groupedCards).map(([authorId, cards]) => (
            <View key={authorId} className='mb-4'>
              <AsyncedCard cards={cards} />
            </View>
          ))
        ) : (
          <Text className='mt-5 w-full text-center text-base'>
            交換したカードがないよ🥺
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
