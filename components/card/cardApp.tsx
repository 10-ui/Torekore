import { useState } from "react";
import { View } from "react-native";
import Sns from "@/components/card/sns";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { snsdata } from "@/utils/snsdata";
import { create } from "zustand";

export const useSnsStore = create((set) => ({
  snsid: snsdata.map((sns) => sns.id),
  setSnsid: (snsid: string[]) => set({ snsid }),
}));

export default function CardApp() {
  return (
    <>
      <View className='h-60 w-full bg-slate-500'></View>
      <Input containerClasses='mt-4' placeholder='名前' variant='card' />
      <Sns />
      <Button label='保存してプレビュー' className='mt-6' />
    </>
  );
}
