import { Alert } from "react-native";
import { router } from "expo-router";
import { supabase } from "@/utils/supabase";
import { useCardInfoStore, useUserStateStore } from "@/utils/store";

export const handleSave = async (session: any) => {
  const { name, doubleName, fontName, snsInfo, uniqueID, avatarUrl } =
    useCardInfoStore.getState();
  const { missions } = useUserStateStore.getState();

  try {
    if (!session?.user?.id) {
      throw new Error("ユーザーが認証されていません。");
    }

    const validSnsData = snsInfo.filter(
      (sns) => sns.name !== "" && sns.userId !== "",
    );

    const { data: snsData, error: snsError } = await supabase
      .from("sns")
      .upsert(
        validSnsData.map((sns) => ({
          author_id: session.user.id,
          sns_id: sns.name,
          user_id: sns.userId,
          updated_at: new Date().toISOString(),
        })),
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

    if (cardError) {
      console.error("カードデータの保存中にエラーが発生:", cardError);
      throw cardError;
    }

    console.log("保存されたカードデータ:", cardData);

    const medalUpsertData = missions.map((mission) => ({
      author_id: session.user.id,
      medal_id: mission.title,
      is_completed: mission.isCompleted,
      updated_at: new Date().toISOString(),
    }));

    const { data: medalData, error: medalError } = await supabase
      .from("medals")
      .upsert(medalUpsertData, {
        onConflict: "author_id,medal_id",
      });

    if (medalError) {
      console.error("メダルデータの保存中にエラーが発生:", medalError);
      throw medalError;
    }

    console.log("保存されたメダルデータ:", medalData);

    router.push("/authed/preview");
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
