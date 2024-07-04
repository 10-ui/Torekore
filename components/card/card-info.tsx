import { useState } from "react";
import { View } from "react-native";
import Sns from "@/components/card/sns";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { snsdata } from "@/utils/snsdata";
import ExpoImage from "@/components/expo-image";

export default function CardInfo() {
  const [snsid, setSnsid] = useState<string[]>(snsdata.map((sns) => sns.id));
  const [bgImage, setBgImage] = useState();
  return (
    <>
      <View className='relative h-60 w-full'>
        <ExpoImage
          source={require("@/assets/background/bg_blue.png")}
          className='absolute left-0 top-0 h-full w-full'
        />
      </View>
      <Input containerClasses='mt-4' placeholder='名前' variant='card' />
      <Sns snsid={snsid} setSnsid={setSnsid} />
      <Button label='保存してプレビュー' className='mt-6' />
    </>
  );
}
