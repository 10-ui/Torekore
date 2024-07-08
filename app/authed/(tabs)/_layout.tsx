import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Tabs } from "expo-router";

export default function AuthedLayout() {
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
