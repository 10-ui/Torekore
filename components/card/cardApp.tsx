import { useState } from "react";
import { View } from "react-native";
import Sns from "@/components/card/sns";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { snsdata } from "@/utils/snsdata";

export default function CardApp() {
  const [snsid, setSnsid] = useState<string[]>(snsdata.map((sns) => sns.id));
  return (
    <>
      <View className='h-60 w-full bg-slate-500'></View>
      <Input containerClasses='mt-4' placeholder='名前' variant='card' />
      <Sns snsid={snsid} setSnsid={setSnsid} />
      <Button label='保存してプレビュー' className='mt-6' />
    </>
  );
}
