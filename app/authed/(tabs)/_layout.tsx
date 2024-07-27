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
import { useCardInfoStore } from "@/utils/store";
import icondata from "@/utils/data/icondata";
import bgImageData from "@/utils/data/bgimagedata";

export default function AuthedLayout() {
  const { signOut, session } = useAuth();
  const { setAllCardInfo, setAllImageInfo } = useCardInfoStore();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session) return;

      try {
        const { data, error } = await supabase
          .from("cards")
          .select("*, sns(*)")
          .eq("author_id", session.user.id)
          .single();

        if (error) throw error;
        if (data) {
          console.log(data);
          const {
            name,
            double_name,
            font_name,
            unique_id,
            sns,
            background_url,
            avatar_url,
          } = data;

          const processedSNSInfo = sns.map((snsItem: any) => {
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
            backgroundImage: bgImageData.find((bgImage) => bgImage.url === backgroundImage)?.src || bgImageData[0].src,
            avatarUrl: avatar_url === "" ? "" : avatar_url,
          });
        }
      } catch (error) {
        console.error("ユーザーデータの取得に失敗しました:", error);
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
