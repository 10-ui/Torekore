import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "@/utils/supabase";
import { Button } from "@/components/button";
import { useActionSheet } from "@expo/react-native-action-sheet";

interface Card {
  id: string;
  name: string;
  // 他の必要なカード情報のフィールドを追加
}

export default function AllCards() {
  const [cards, setCards] = useState<Card[]>([]);
  const { showActionSheetWithOptions } = useActionSheet();
  const [label, setLabel] = useState("レベルが高い順");

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      // スキャンされたカードIDを取得
      const scannedCardIds = await AsyncStorage.getItem("scannedCardIds");
      if (scannedCardIds) {
        const cardIds = JSON.parse(scannedCardIds);

        // カードIDを使用してSupabaseからカード情報を取得
        const { data, error } = await supabase
          .from("cards")
          .select("id, name") // 必要なフィールドを選択
          .in("id", cardIds);

        if (error) throw error;

        if (data) {
          setCards(data);
        }
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const renderCard = ({ item }: { item: Card }) => (
    <View style={styles.card}>
      <Text style={styles.cardName}>{item.name}</Text>
      {/* 他のカード情報を表示 */}
    </View>
  );

  const handleSort = () => {
    const options = ["レベルが高い順", "古い順", "新しい順", "キャンセル"];
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            // レベルが高い順
            setLabel("レベルが高い順");
            break;

          case 1:
            // 古い順
            setLabel("古い順");
            break;

          case 2:
            // 新しい順
            setLabel("新しい順");
            break;

          case cancelButtonIndex:
          // Canceled
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <Button
        variant='outline'
        className='ml-auto h-10 w-40'
        label={label}
        onPress={handleSort}
      />
      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  cardName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
