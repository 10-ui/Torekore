import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { icondataMiddle, icondataBottom } from "@/utils/icondata";
import ExpoImage from "@/components/expo-image";

export default function Sns() {
  const [selectedIcons, setSelectedIcons] = useState(
    Array(4).fill(require("@/assets/logos/sns/empty.png")),
  );

  const handleRemoveIcon = (index: number) => {
    const updatedIcons = [...selectedIcons];
    updatedIcons[index] = require("@/assets/logos/sns/empty.png"); // アイコンをempty.pngに置き換える
    setSelectedIcons(updatedIcons);
  };

  const handleIconClick = (src: string, index: number) => {
    const updatedIcons = [...selectedIcons];
    // アイコンが既にempty.pngでない場合に置き換える
    if (updatedIcons[index] !== require("@/assets/logos/sns/empty.png")) {
      updatedIcons[index] = require("@/assets/logos/sns/empty.png");
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

  return (
    <View className='mt-2 flex flex-row items-start border border-input px-3 py-4'>
      <Text className='mr-9'>SNS</Text>
      <View className='mr-12 flex flex-col gap-y-8'>
        <View className='flex flex-row gap-x-3'>
          {selectedIcons.map((icon, index) => (
            <View key={index} className='relative'>
              {icon !== require("@/assets/logos/sns/empty.png") && (
                <TouchableOpacity
                  onPress={() => handleRemoveIcon(index)}
                  className='absolute right-0 top-0 z-10'
                  style={{
                    transform: [{ translateX: 7.5 }, { translateY: -7.5 }],
                  }}>
                  <ExpoImage
                    source={require("@/assets/logos/sns/close.svg")}
                    className='h-5 w-5'
                  />
                </TouchableOpacity>
              )}
              <ExpoImage source={icon} className='h-12.5 w-12.5' />
            </View>
          ))}
        </View>
        <View className='flex flex-row gap-x-3'>
          {icondataMiddle.map((item, index) => (
            <TouchableOpacity
              key={item.name}
              onPress={() => handleIconClick(item.src, index)}
              disabled={selectedIcons.includes(item.src)}>
              <ExpoImage
                source={item.src}
                className={`h-12.5 w-12.5 ${selectedIcons.includes(item.src) ? "opacity-50" : ""}`}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View className='flex flex-row gap-x-3'>
          {icondataBottom.map((item, index) => (
            <TouchableOpacity
              key={item.name}
              onPress={() => handleIconClick(item.src, index)}
              disabled={selectedIcons.includes(item.src)}>
              <ExpoImage
                source={item.src}
                className={`h-12.5 w-12.5 ${selectedIcons.includes(item.src) ? "opacity-50" : ""}`}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
