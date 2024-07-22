import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { useAuth } from "@/providers/supabaseAuth";
import { TouchableOpacity } from "react-native";

export default function AuthedLayout() {
  const { signOut } = useAuth();
  return (
    <ActionSheetProvider>
      <Tabs>
        <Tabs.Screen
          name='index'
          options={{
            headerStyle: {
              height: 100,
            },
            headerTitle: () => {
              return (
                <Image
                  source={require("@/assets/logos/app/appLogo.svg")}
                  style={{ width: 100, height: 30 }}
                />
              );
            },
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name='home'
                size={24}
                color={focused ? "dodgerblue" : "gray"}
              />
            ),
            headerRight: () => (
              <TouchableOpacity onPress={signOut} className='mr-4'>
                <Ionicons name='log-out-outline' size={30} color={"#000"} />
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
