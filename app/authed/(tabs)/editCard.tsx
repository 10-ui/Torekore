import { Text, View } from "react-native";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/tabs";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Sns from "@/components/card/sns";

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
          <Input className='mt-4' placeholder='名前' variant='card' />
          <Sns />
          <Button label='保存してプレビュー' className='mt-6' />
        </TabsContent>
        <TabsContent value='カードスタイル'>
          <View className='bg-missionBlue h-60 w-full space-y-7'>
            <Text>背景</Text>
            <Text>フォント</Text>
          </View>
        </TabsContent>
      </Tabs>
    </View>
  );
}
