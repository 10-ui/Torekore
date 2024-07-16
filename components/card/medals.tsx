import { View, Text, Pressable } from "react-native";
import icondata from "@/utils/data/icondata";
import ExpoImage from "@/components/expo-image";
import { useCardInfoStore } from "@/utils/store";

export default function Medals() {
  const { snsInfo } = useCardInfoStore();
  const setSnsInfo = useCardInfoStore((state) => state.setSnsInfo);

  const handleIconAdd = (param: {
    name: string;
    src: string;
    userId: string;
    baseLink: string;
  }) => {
    const emptyIconIndex = snsInfo.findIndex(
      (item) => item.src === require("@/assets/logos/sns/empty.png"),
    );
    if (emptyIconIndex !== -1) {
      const updatedSnsInfo = [...snsInfo];
      updatedSnsInfo[emptyIconIndex] = {
        ...snsInfo[emptyIconIndex],
        name: param.name,
        src: param.src,
        userId: param.userId,
        baseLink: param.baseLink,
      };
      setSnsInfo(updatedSnsInfo);
    }
  };

  const handleIconRemove = (param: {
    name: string;
    src: string;
    userId: string;
    baseLink: string;
  }) => {
    const updatedSnsInfo = snsInfo.map((item) => {
      if (item.src === param.src) {
        return {
          ...item,
          name: "",
          src: require("@/assets/logos/sns/empty.png"),
          userId: "",
          baseLink: "",
        };
      }
      return item;
    });
    setSnsInfo(updatedSnsInfo);
  };

  return (
    <View className='mt-2 flex w-full flex-col gap-7 border border-input bg-white p-4'>
      <View className='flex flex-row items-start justify-between'>
        <Text className='text-base'>勲章</Text>
        <View className='flex flex-col gap-y-8'>
          <>
            {["middle", "bottom"].map((set) => (
              <View key={set} className='flex flex-row gap-x-3'>
                {icondata
                  .filter((item) => item.set === set)
                  .map((param) => (
                    <Pressable
                      key={param.name}
                      onPress={() => handleIconAdd(param)}
                      disabled={snsInfo.some((sns) => sns.src === param.src)}>
                      <ExpoImage
                        source={param.src}
                        className={`h-12.5 w-12.5 ${snsInfo.some((sns) => sns.src === param.src) ? "opacity-50" : ""}`}
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
