import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function AuthedLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          title: "ホーム",
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
  );
}
