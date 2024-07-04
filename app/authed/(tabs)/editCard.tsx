import { Text, View, ScrollView } from "react-native";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/tabs";
import CardInfo from "@/components/card/card-info";
import { useState } from "react";

export default function EditCard() {
  return (
    <View className='flex-1 items-center bg-white p-4'>
      <ScrollView>
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
            <CardInfo />
          </TabsContent>
          <TabsContent value='カードスタイル'>
            <View className='bg-missionBlue h-60 w-full space-y-7'>
              <Text>背景</Text>
              <Text>フォント</Text>
            </View>
          </TabsContent>
        </Tabs>
      </ScrollView>
    </View>
  );
}
