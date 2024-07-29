import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { TouchableOpacity } from "react-native";
import { Tabs } from "expo-router";
import { Image } from "expo-image";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { useAuth } from "@/providers/supabaseAuth";
import { useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { useCardInfoStore, useUserStateStore } from "@/utils/store";
import icondata from "@/utils/data/icondata";
import bgImageData from "@/utils/data/bgimagedata";
import missiondata from "@/utils/data/missiondata";
import { Mission } from "@/utils/interface";

export default function AuthedLayout() {
  const { signOut, session } = useAuth();
  const { setAllCardInfo, setAllImageInfo } = useCardInfoStore();
  const { setMissions } = useUserStateStore();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session) return;

      try {
        const { data, error } = await supabase
          .from("cards")
          .select("*, sns(*)")
          .eq("author_id", session.user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          throw error;
        }

        if (data) {
          const {
            name,
            double_name,
            font_name,
            unique_id,
            sns,
            background_url,
            avatar_url,
          } = data;

          // SNSデータを更新日時でソートし、最大4つまで取得
          const sortedSNS = sns
            .sort(
              (a: any, b: any) =>
                new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime(),
            )
            .slice(0, 4);

          const processedSNSInfo = sortedSNS.map((snsItem: any) => {
            const iconInfo = icondata.find(
              (icon) => icon.name === snsItem.sns_id,
            );
            return {
              name: snsItem.sns_id,
              source: iconInfo
                ? iconInfo.source
                : require("@/assets/logos/sns/empty.png"),
              userId: snsItem.user_id,
              baseLink: iconInfo ? iconInfo.baseLink : "",
            };
          });

          const filledSNSInfo = [
            ...processedSNSInfo,
            ...Array(Math.max(0, 4 - processedSNSInfo.length)).fill({
              name: "",
              source: require("@/assets/logos/sns/empty.png"),
              userId: "",
              baseLink: "",
            }),
          ];

          const defaultBackgroundUrl = "bg_mayuka";
          let backgroundImage = background_url || defaultBackgroundUrl;

          setAllCardInfo({
            name: name ?? "",
            doubleName: double_name ?? "",
            fontName: font_name ?? "",
            uniqueID: unique_id === "" ? nanoid(10) : unique_id,
            snsInfo: filledSNSInfo,
          });
          setAllImageInfo({
            backgroundImage:
              bgImageData.find((bgImage) => bgImage.url === backgroundImage)
                ?.src ||
              (backgroundImage.startsWith("https://")
                ? backgroundImage
                : bgImageData[0].src),
            avatarUrl: avatar_url === "" ? "" : avatar_url,
          });
        } else {
          // データが存在しない場合、初期値を挿入
          const initialData = {
            author_id: session.user.id,
            name: "",
            double_name: "",
            font_name: "Noto Sans JP",
            unique_id: nanoid(10),
            background_url: "bg_mayuka",
            avatar_url: "",
          };

          const { error: insertError } = await supabase
            .from("cards")
            .insert(initialData);

          if (insertError) throw insertError;

          // 初期SNS情報
          const initialSNSInfo = Array(4).fill({
            name: "",
            source: require("@/assets/logos/sns/empty.png"),
            userId: "",
            baseLink: "",
          });

          setAllCardInfo({
            name: initialData.name,
            doubleName: initialData.double_name,
            fontName: initialData.font_name,
            uniqueID: initialData.unique_id,
            snsInfo: initialSNSInfo,
          });

          setAllImageInfo({
            backgroundImage:
              bgImageData.find(
                (bgImage) => bgImage.url === initialData.background_url,
              )?.src || bgImageData[0].src,
            avatarUrl: initialData.avatar_url,
          });
        }

        // メダル情報の取得
        const { data: medalsData, error: medalsError } = await supabase
          .from("medals")
          .select("*")
          .eq("author_id", session.user.id);

        if (medalsError) throw medalsError;

        // ミッション情報の設定（最大2つまで）
        const completedMissions =
          medalsData?.filter((m) => m.is_completed).slice(0, 2) || [];

        const updatedMissions: Mission[] = missiondata.map((mission) => {
          const completedMission = completedMissions.find(
            (m) => m.medal_id === mission.title,
          );
          return {
            ...mission,
            isCompleted: !!completedMission,
            source: completedMission
              ? mission.source
              : require("@/assets/icons/mission/empty.png"),
          };
        });

        // 完了したミッションを先頭に、未完了のミッションを後ろに配置
        updatedMissions.sort((a, b) => {
          if (a.isCompleted && !b.isCompleted) return -1;
          if (!a.isCompleted && b.isCompleted) return 1;
          return 0;
        });

        // 最大2つのミッションを設定し、不足分はempty.pngで埋める
        const missionsToSet = updatedMissions.slice(0, 2);
        while (missionsToSet.length < 2) {
          missionsToSet.push({
            id: 0,
            title: "",
            description: "",
            source: require("@/assets/icons/mission/empty.png"),
            isCompleted: false,
          });
        }

        setMissions(missionsToSet);
      } catch (error) {
        console.error("ユーザーデータの取得または初期化に失敗しました:", error);
      }
    };

    fetchUserData();
  }, [session]);

  return (
    <ActionSheetProvider>
      <Tabs>
        <Tabs.Screen
          name='index'
          options={{
            headerStyle: {
              height: 100,
            },
            headerTitle: () => (
              <Image
                source={require("@/assets/logos/app/appLogo.svg")}
                style={{ width: 100, height: 30 }}
              />
            ),
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name='home'
                size={24}
                color={focused ? "dodgerblue" : "gray"}
              />
            ),
            headerRight: () => (
              <TouchableOpacity onPress={signOut} className='mr-4'>
                <Ionicons name='log-out-outline' size={30} color='#000' />
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name='editCard'
          options={{
            title: "カード編集",
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name='card-account-details'
                size={24}
                color={focused ? "dodgerblue" : "gray"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='shareCard'
          options={{
            title: "カード交換",
            tabBarIcon: ({ focused }) => (
              <Octicons
                name='share'
                size={24}
                color={focused ? "dodgerblue" : "gray"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='allCards'
          options={{
            title: "カード一覧",
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name='cards'
                size={24}
                color={focused ? "dodgerblue" : "gray"}
              />
            ),
          }}
        />
      </Tabs>
    </ActionSheetProvider>
  );
}
