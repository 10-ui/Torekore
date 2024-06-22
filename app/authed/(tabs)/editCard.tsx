import { View, Text } from "react-native";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/tabs";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

export default function EditCard() {
  return (
    <View className='flex-1 items-center bg-white p-4'>
      <Tabs defaultValue='カード情報'>
        <TabsList>
          <TabsTrigger
            key='カード情報'
            id='カード情報'
            title='カード情報'
            value='カード情報'
          />
          <TabsTrigger
            key='カードスタイル'
            id='カードスタイル'
            title='カードスタイル'
            value='カードスタイル'
          />
        </TabsList>
        <TabsContent value='カード情報'>
          <View className='h-60 w-full bg-slate-500'></View>
          <Input className='mt-3' placeholder='名前' />
          <Input className='mt-3' placeholder='SNS' />
          <Input className='mt-3' placeholder='二つ名' />
          <Input className='mt-3' placeholder='勲章' />
          <Button label='保存してプレビュー' className='mt-6' />
        </TabsContent>
        <TabsContent value='カードスタイル'>
          <View className='h-60 w-full bg-missionBlue'></View>
          <Input className='mt-3' placeholder='背景' />
          <Input className='mt-3' placeholder='フォント' />
        </TabsContent>
      </Tabs>
    </View>
  );
}
