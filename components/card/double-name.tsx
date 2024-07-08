import { useState, useRef, useEffect } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { Divider } from "@/components/divider";
import ExpoImage from "@/components/expo-image";
import { doubleNameData } from "@/utils/data/doublename";
import { useCardInfoStore } from "@/utils/store";

export default function DoubleName() {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedLeft, setSelectedLeft] = useState("");
  const [selectedRight, setSelectedRight] = useState("");
  const { doubleName } = useCardInfoStore();
  const setDoubleName = useCardInfoStore((state) => state.setDoubleName);
  const leftScrollViewRef = useRef<ScrollView>(null);
  const rightScrollViewRef = useRef<ScrollView>(null);
  const itemHeight = 28; // 各項目の高さ

  useEffect(() => {
    const [initialLeft, initialRight] = doubleName.split(" ");
    const leftIndex = doubleNameData[0].left!.findIndex(
      (item) => item.name === initialLeft,
    );
    const rightIndex = doubleNameData[1].right!.findIndex(
      (item) => item.name === initialRight,
    );

    if (leftIndex !== -1) {
      leftScrollViewRef.current?.scrollTo({
        y: leftIndex * itemHeight,
        animated: false,
      });
      setSelectedLeft(initialLeft);
    }
    if (rightIndex !== -1) {
      rightScrollViewRef.current?.scrollTo({
        y: rightIndex * itemHeight,
        animated: false,
      });
      setSelectedRight(initialRight);
    }
  }, []);

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      setDoubleName(selectedLeft + " " + selectedRight);
    }
  }, [selectedLeft, selectedRight]);

  // スクロール停止時に中央の項目を選択
  const handleScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
    side: "left" | "right",
  ) => {
    const y = event.nativeEvent.contentOffset.y;
    const centerIndex = Math.round(y / itemHeight);
    const items =
      side === "left" ? doubleNameData[0].left : doubleNameData[1].right;
    if (!items) {
      return;
    }
    const selectedItem = items[centerIndex];
    if (!selectedItem) {
      return;
    }
    if (side === "left") {
      setSelectedLeft(selectedItem.name);
    } else {
      setSelectedRight(selectedItem.name);
    }
  };

  return (
    <View className='mt-2 flex w-full flex-col gap-7 border border-input py-4 pl-3 pr-2'>
      <View className='flex flex-row items-start justify-between'>
        <Text className='mr-7 text-base'>二つ名</Text>
        <Pressable
          className='relative flex h-8 grow items-center justify-center rounded-md border border-input bg-appLightBlue'
          onPress={() => setIsOpened(!isOpened)}>
          <Text>{doubleName}</Text>
          <View className='absolute right-1 top-1'>
            <ExpoImage
              source={
                isOpened
                  ? require("@/assets/logos/sns/minus.svg")
                  : require("@/assets/logos/sns/plus.svg")
              }
              className='h-5 w-5'
            />
          </View>
        </Pressable>
      </View>
      {isOpened && (
        <View className='flex h-50 w-full flex-row items-center justify-center gap-5 p-2'>
          <View className='relative flex h-full flex-row items-center gap-4'>
            <View className='h-50'>
              <ScrollView
                ref={leftScrollViewRef}
                className='h-100 hidden-scrollbar overflow-scroll'
                onScrollEndDrag={(e) => handleScroll(e, "left")}
                scrollEventThrottle={16}>
                <View className='py-22 flex flex-col gap-1'>
                  {doubleNameData[0].left?.map((item) => (
                    <Text
                      key={item.name}
                      className='text-right text-xl font-semibold'>
                      {item.name}
                    </Text>
                  ))}
                </View>
              </ScrollView>
            </View>
            <Divider orientation='vertical' className='w-2 bg-slate-400' />
            <View className='h-50'>
              <ScrollView
                ref={rightScrollViewRef}
                className='h-100 hidden-scrollbar overflow-scroll'
                onScrollEndDrag={(e) => handleScroll(e, "right")}
                scrollEventThrottle={16}>
                <View className='py-22 flex flex-col gap-1'>
                  {doubleNameData[1].right?.map((item) => (
                    <Text
                      key={item.name}
                      className='text-left text-xl font-semibold'>
                      {item.name}
                    </Text>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
          <View className='pointer-events-none absolute inset-x-0 top-1/2 -z-10 -mt-3 h-10 border-2 border-input bg-appLightBlue p-2'></View>
        </View>
      )}
    </View>
  );
}
