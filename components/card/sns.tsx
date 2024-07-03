import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { icondata } from "@/utils/icondata";
import ExpoImage from "@/components/expo-image";

export default function Sns() {
  const [selectedIcons, setSelectedIcons] = useState(
    Array(4).fill(require("@/assets/logos/sns/empty.png")),
  );
  const [isOpened, setIsOpened] = useState(false);

  const handleRemoveIcon = (index: number) => {
    const updatedIcons = [...selectedIcons];
    updatedIcons[index] = require("@/assets/logos/sns/empty.png");
    setSelectedIcons(updatedIcons);
  };

  const handleIconClick = (src: string, iconSet: string) => {
    const setIcons = icondata
      .filter((item) => item.set === iconSet)
      .map((item) => item.src);
    const setIndex = setIcons.indexOf(src);
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

  return (
    <View className='mt-2 flex flex-row items-start border border-input px-3 py-4'>
      <Text className='mr-9'>SNS</Text>
      <View className='mr-12 flex flex-col gap-y-8'>
        <View className='flex flex-row gap-x-3'>
          {selectedIcons.map((icon, index) => (
            <View key={index} className='relative'>
              {icon !== require("@/assets/logos/sns/empty.png") && isOpened && (
                <Pressable
                  onPress={() => handleRemoveIcon(index)}
                  className='absolute right-0 top-0 z-10'
                  style={{
                    transform: [{ translateX: 7.5 }, { translateY: -7.5 }],
                  }}>
                  <ExpoImage
                    source={require("@/assets/logos/sns/close.svg")}
                    className='h-5 w-5'
                  />
                </Pressable>
              )}
              <ExpoImage source={icon} className='h-12.5 w-12.5' />
            </View>
          ))}
        </View>
        {isOpened && (
          <>
            {["middle", "bottom"].map((set) => (
              <View key={set} className='flex flex-row gap-x-3'>
                {icondata
                  .filter((item) => item.set === set)
                  .map((item, index) => (
                    <Pressable
                      key={item.name}
                      onPress={() => handleIconClick(item.src, set)}
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
        className='mr-1 mt-[15px]'>
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
  );
}
