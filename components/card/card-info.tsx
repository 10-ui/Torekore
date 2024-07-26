import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { router } from "expo-router";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Sns from "@/components/card/sns";
import CardView from "@/components/card/card-view";
import DoubleName from "@/components/card/double-name";
import Medals from "@/components/card/medals";
import { useCardInfoStore } from "@/utils/store";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/providers/supabaseAuth";
import { Alert } from "react-native";

export default function CardInfo() {
  const { name, doubleName, fontName, snsInfo, uniqueID, avatarUrl } =
    useCardInfoStore();
  const { session } = useAuth();
  const setName = useCardInfoStore((state) => state.setName);
  console.log(snsInfo);

  const handleSave = async () => {
    try {
      if (!session?.user?.id) {
        throw new Error("ユーザーが認証されていません。");
      }

      const { data: snsData, error: snsError } = await supabase
        .from("sns")
        .upsert(
          {
            author_id: session.user.id,
            sns_id: "twitter",
            user_id: "sen._.ssssp",
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "author_id,sns_id",
          },
        );

      if (snsError) {
        console.error("SNSデータの保存中にエラーが発生:", snsError);
        throw snsError;
      }

      console.log("保存されたSNSデータ:", snsData);

      const { data: cardData, error: cardError } = await supabase
        .from("cards")
        .upsert(
          {
            name: name,
            double_name: doubleName,
            font_name: fontName,
            unique_id: uniqueID,
            avatar_url: avatarUrl,
            author_id: session?.user?.id,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "author_id" },
        )
        .select();
      console.log(cardData);
      router.push("/authed/preview");
      if (cardError) {
        console.log(cardError);
      }
    } catch (error) {
      console.error("保存中にエラーが発生しました:", error);
      if (error instanceof Error) {
        console.error("エラーの詳細:", error.message);
        console.error("エラーのスタックトレース:", error.stack);
      }
      Alert.alert(
        "エラー",
        `データの保存中にエラーが発生しました: ${error instanceof Error ? error.message : "不明なエラー"}`,
        [{ text: "OK" }],
      );
    }
  };

  const handleNameChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const newName = e.nativeEvent.text;
    setName(newName);
  };

  return (
    <>
      <CardView />
      <Input
        containerClasses='mt-4'
        placeholder='名前'
        variant='card'
        value={name}
        onChange={handleNameChange}
      />
      <Sns />
      <DoubleName />
      <Medals />
      <Button
        label='保存してプレビュー'
        className='mt-6'
        onPress={handleSave}
      />
    </>
  );
}
