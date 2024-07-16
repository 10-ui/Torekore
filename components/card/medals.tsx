import { View, Text, Pressable } from "react-native";
import missiondata from "@/utils/data/missiondata";
import ExpoImage from "@/components/expo-image";
import { useUserStateStore } from "@/utils/store";

export default function Medals() {
  const { missions } = useUserStateStore();
  const setMissions = useUserStateStore((state) => state.setMissions);

  const handleIconAdd = (param: {
    source: string;
    title: string;
    description: string;
    isCompleted: boolean;
  }) => {
    const existingIndex = missions.findIndex(
      (item) => item.source === param.source,
    );

    if (existingIndex === -1) {
      let updatedMissions = [
        ...missions,
        {
          source: param.source,
          title: param.title,
          description: param.description,
          isCompleted: param.isCompleted,
        },
      ];

      // 配列の要素数が2を超える場合、最初の要素を削除
      if (updatedMissions.length > 2) {
        updatedMissions = updatedMissions.slice(1);
      }

      setMissions(updatedMissions);
    }
  };

  return (
    <View className='mt-2 flex w-full flex-col gap-7 border border-input bg-white p-4'>
      <View className='flex flex-row items-start justify-start gap-9'>
        <Text className='text-base'>勲章</Text>
        <View className='flex flex-col gap-y-8'>
          <>
            {["top", "bottom"].map((set) => (
              <View key={set} className='flex flex-row gap-x-3'>
                {missiondata
                  .filter((item) => item.set === set)
                  .map((mission) => (
                    <Pressable
                      key={mission.title}
                      onPress={() => handleIconAdd(mission)}
                      disabled={
                        missions.some((m) => m.source === mission.source) ||
                        mission.isCompleted === false
                      }>
                      <ExpoImage
                        source={
                          mission.isCompleted
                            ? mission.source
                            : require("@/assets/icons/mission/empty.png")
                        }
                        className={`h-12.5 w-12.5 ${missions.some((m) => m.source === mission.source) ? "opacity-50" : ""}`}
                      />
                    </Pressable>
                  ))}
              </View>
            ))}
          </>
        </View>
      </View>
    </View>
  );
}
