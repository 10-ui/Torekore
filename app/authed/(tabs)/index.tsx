import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Button } from "@/components/button";
import { router } from "expo-router";
import { Text, View, ScrollView } from "react-native";
import CardView from "@/components/card/card-view";
import { useUserStateStore } from "@/utils/store";
import missiondata from "@/utils/data/missiondata";

export default function Home() {
  const { missions } = useUserStateStore();

  const getMissionStatus = (missionTitle: string): boolean => {
    const mission = missions.find((m) => m.title === missionTitle);
    return mission ? mission.isCompleted : false;
  };

  return (
    <ScrollView className='w-full bg-appBG px-4 py-6'>
      <CardView />
      <Button
        label='カードをシェア'
        className='mt-6'
        onPress={() => router.push("/authed/modal")}
      />
      <View className='mt-6 w-full rounded-lg border border-input bg-appLightBlue p-5'>
        <Text className='pb-5 text-center text-lg font-medium'>ミッション</Text>
        {missiondata.map((mission) => (
          <View
            key={mission.id}
            className='mb-4 rounded-lg bg-white px-7 py-5 shadow-sm'>
            <View className='flex flex-row items-center justify-start gap-7'>
              <Avatar className='h-15 w-15 rounded-none'>
                <AvatarImage source={mission.source} />
                <AvatarFallback>CG</AvatarFallback>
              </Avatar>
              <View>
                <Text className='mb-1 text-base'>{mission.title}</Text>
                <Text className='mb-2 text-xs'>{mission.description}</Text>
                <Button
                  label={
                    getMissionStatus(mission.title) ? "達成済み" : "受け取る"
                  }
                  variant={
                    getMissionStatus(mission.title) ? "default" : "mission"
                  }
                  className='h-8 w-33.5'
                  disabled={getMissionStatus(mission.title)}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
