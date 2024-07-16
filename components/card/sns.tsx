import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import icondata from "@/utils/data/icondata";
import ExpoImage from "@/components/expo-image";
import { useCardInfoStore } from "@/utils/store";

export default function Sns() {
  const [isOpened, setIsOpened] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentBaseLink, setCurrentBaseLink] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
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

  const openSetIdModal = (param: {
    name: string;
    src: string;
    userId: string;
    baseLink: string;
  }) => {
    setIsModalVisible(true);
    setCurrentBaseLink(param.baseLink);
    setCurrentUserId(param.userId);
  };

  const saveId = () => {
    const updatedSnsId = snsInfo.map((item) => {
      if (item.baseLink === currentBaseLink) {
        return { ...item, userId: currentUserId };
      }
      return item;
    });
    setSnsInfo(updatedSnsId);
    setIsModalVisible(false);
  };

  return (
    <View className='mt-2 flex w-full flex-col gap-7 border border-input bg-white p-4'>
      <View className='flex flex-row items-start justify-between'>
        <Text className='text-base font-bold'>SNS</Text>
        <View className='flex flex-col gap-y-8'>
          <View className='flex flex-row gap-x-3'>
            {snsInfo.map((item, index) => (
              <View key={index} className='relative'>
                {item.src !== require("@/assets/logos/sns/empty.png") &&
                  isOpened && (
                    <Pressable
                      className='absolute right-0 top-0 z-10'
                      disabled={isModalVisible}
                      onPress={() => handleIconRemove(item)}
                      style={{
                        transform: [{ translateX: 7.5 }, { translateY: -7.5 }],
                      }}>
                      <ExpoImage
                        source={require("@/assets/logos/sns/close.svg")}
                        className='h-5 w-5'
                      />
                    </Pressable>
                  )}
                <Pressable
                  onPress={() => openSetIdModal(item)}
                  disabled={!isOpened}>
                  <ExpoImage source={item.src} className='h-12.5 w-12.5' />
                </Pressable>
              </View>
            ))}
          </View>
          {isOpened && !isModalVisible && (
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
          )}
        </View>
        <Pressable onPress={() => setIsOpened(!isOpened)} className='mt-[15px]'>
          <ExpoImage
            source={
              isOpened
                ? require("@/assets/logos/sns/minus.svg")
                : require("@/assets/logos/sns/plus.svg")
            }
            className='h-5 w-5'
          />
        </Pressable>
      </View>
      {isModalVisible && (
        <View className='mx-3 max-w-full rounded-lg border border-input bg-appLightBlue p-4'>
          <Text className='text-base'>アカウント名を入力</Text>
          <View className='flex w-full flex-row items-center justify-center gap-x-2'>
            <Text className='text-sm'>{currentBaseLink}</Text>
            <Input
              value={currentUserId}
              onChangeText={setCurrentUserId}
              placeholder='@accountID'
              className='h-8'
              containerClasses='w-36'
            />
          </View>
          <Button
            onPress={saveId}
            label='保存'
            className='mx-auto mt-6 h-8 w-3/5'
          />
        </View>
      )}
    </View>
  );
}
