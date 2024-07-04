import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { icondata } from "@/utils/icondata";
import ExpoImage from "@/components/expo-image";
import { useSnsStore } from "./cardApp";

export default function Sns() {
  const [selectedIcons, setSelectedIcons] = useState(
    Array(4).fill(require("@/assets/logos/sns/empty.png")),
  );
  const [isOpened, setIsOpened] = useState(false);
  const [customModalVisible, setCustomModalVisible] = useState(false);
  const [currentLink, setCurrentLink] = useState("");
  const [inputId, setInputId] = useState("");
  const { snsid, setSnsid } = useSnsStore("");

  const openCustomModal = (link: string) => {
    setCurrentLink(link);
    setCustomModalVisible(true);
    const index = icondata.findIndex((item) => item.snslink === link);
    setInputId(snsid[index] || ""); // 現在のSNS IDを設定
  };

  const handleRemoveIcon = (index: number) => {
    const updatedIcons = [...selectedIcons];
    updatedIcons[index] = require("@/assets/logos/sns/empty.png");
    setSelectedIcons(updatedIcons);
  };

  const handleTopIconClick = (icon: string) => {
    if (!isOpened) return;
    const iconLink = icondata.find((item) => item.src === icon)?.snslink;
    if (!iconLink) return;
    openCustomModal(iconLink);
  };

  const handleIconClick = (src: string) => {
    const updatedIcons = [...selectedIcons];
    const currentIconIndex = updatedIcons.findIndex((icon) => icon === src);

    if (currentIconIndex !== -1) {
      updatedIcons[currentIconIndex] = require("@/assets/logos/sns/empty.png");
    } else {
      const emptyIndex = updatedIcons.indexOf(
        require("@/assets/logos/sns/empty.png"),
      );
      if (emptyIndex !== -1) {
        updatedIcons[emptyIndex] = src;
      }
    }
    setSelectedIcons(updatedIcons);
  };

  const saveId = () => {
    const newSnsIds = [...snsid];
    const iconIndex = icondata.findIndex(
      (item) => item.snslink === currentLink,
    );
    if (iconIndex !== -1) {
      newSnsIds[iconIndex] = inputId; // SNS IDを更新
    }
    setSnsid(newSnsIds); // 更新されたSNS IDリストを保存
    setCustomModalVisible(false);
  };

  return (
    <View className='mt-2 flex w-full flex-col gap-7 border border-input px-3 py-4'>
      <View className='flex flex-row items-start'>
        <Text className='mr-9 text-base font-bold'>SNS</Text>
        <View className='mr-12 flex flex-col gap-y-8'>
          <View className='flex flex-row gap-x-3'>
            {selectedIcons.map((icon, index) => (
              <View key={index} className='relative'>
                {icon !== require("@/assets/logos/sns/empty.png") &&
                  isOpened && (
                    <Pressable
                      onPress={() => handleRemoveIcon(index)}
                      className='absolute right-0 top-0 z-10'
                      disabled={customModalVisible}
                      style={{
                        transform: [{ translateX: 7.5 }, { translateY: -7.5 }],
                      }}>
                      <ExpoImage
                        source={require("@/assets/logos/sns/close.svg")}
                        className='h-5 w-5'
                      />
                    </Pressable>
                  )}
                <Pressable onPress={() => handleTopIconClick(icon)}>
                  <ExpoImage source={icon} className='h-12.5 w-12.5' />
                </Pressable>
              </View>
            ))}
          </View>
          {isOpened && !customModalVisible && (
            <>
              {["middle", "bottom"].map((set) => (
                <View key={set} className='flex flex-row gap-x-3'>
                  {icondata
                    .filter((item) => item.set === set)
                    .map((item, index) => (
                      <Pressable
                        key={item.name}
                        onPress={() => handleIconClick(item.src)}
                        disabled={selectedIcons.includes(item.src)}>
                        <ExpoImage
                          source={item.src}
                          className={`h-12.5 w-12.5 ${selectedIcons.includes(item.src) ? "opacity-50" : ""}`}
                        />
                      </Pressable>
                    ))}
                </View>
              ))}
            </>
          )}
        </View>
        <Pressable
          onPress={() => setIsOpened(!isOpened)}
          className='mr-1 mt-[15px]'
          disabled={customModalVisible}>
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
      {customModalVisible && (
        <View className='mx-3 max-w-full rounded-lg border border-input bg-appLightBlue p-4'>
          <Text className='text-base'>アカウント名を入力</Text>
          <View className='flex w-full flex-row items-center justify-center gap-x-2'>
            <Text className='text-sm'>{currentLink}/</Text>
            <Input
              value={inputId}
              onChangeText={setInputId}
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
