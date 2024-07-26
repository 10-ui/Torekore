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

export default function AuthedLayout() {
  const { signOut, session } = useAuth();
  const { setAllCardInfo, setAllImageInfo } = useCardInfoStore();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session) return;

      try {
        const { data, error } = await supabase
          .from("cards")
          .select("*")
          .eq("author_id", session.user.id)
          .single();

        if (error) throw error;
        if (data) {
          console.log(data);
          const { name, double_name, font_name, unique_id } = data;
          setAllCardInfo({
            name: name ? name : "",
            doubleName: double_name ? double_name : "",
            fontName: font_name ? font_name : "",
            uniqueID: unique_id === "" ? nanoid(10) : unique_id,
            snsInfo: Array(4).fill({
              name: "",
              source: require("@/assets/logos/sns/empty.png"),
              userId: "",
              baseLink: "",
            }),
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
