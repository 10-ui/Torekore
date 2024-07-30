import { View, Text, Pressable } from "react-native";
import missiondata from "@/utils/data/missiondata";
import ExpoImage from "@/components/expo-image";
import { useUserStateStore } from "@/utils/store";
import { Mission } from "@/utils/interface";

export default function Medals() {
  const { missions } = useUserStateStore();
  const setMissions = useUserStateStore((state) => state.setMissions);

  const handleIconAdd = (mission: Mission) => {
    console.log("++", mission);
    const existingIndex = missions.findIndex(
      (item) => item.title === mission.title,
    );

    if (existingIndex === -1 && missions.length < 2) {
      const updatedMissions = [
        ...missions,
        {
          ...mission,
          isCompleted: true,
        },
      ];
      setMissions(updatedMissions);
    }
  };

  const getMissionStatus = (missionTitle: string): boolean => {
    const mission = missions.find((m) => m.title === missionTitle);
    return mission ? mission.isCompleted : false;
  };

  return (
    <View className='mt-2 flex w-full flex-col gap-7 border border-input bg-white p-4'>
      <View className='flex flex-row items-start justify-start gap-9'>
        <Text className='text-base'>勲章</Text>
        <View className='flex flex-col gap-y-8'>
          {["top", "bottom"].map((set) => (
            <View key={set} className='flex flex-row gap-x-3'>
              {missiondata
                .filter((item) => item.set === set)
                .map((mission) => {
                  const isCompleted = getMissionStatus(mission.title);
                  const isSelected = missions.some(
                    (m) => m.title === mission.title,
                  );
                  return (
                    <Pressable
                      key={mission.title}
                      onPress={() => handleIconAdd(mission)}
                      // disabled={isSelected || !isCompleted}>
                    >
                      <ExpoImage
                        source={
                          isCompleted
                            ? mission.source
                            : require("@/assets/icons/mission/empty.png")
                        }
                        className={`h-12.5 w-12.5 ${isSelected ? "opacity-50" : ""}`}
                      />
                    </Pressable>
                  );
                })}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
