import { Text, View, ScrollView } from "react-native";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/tabs";
import CardInfo from "@/components/card/card-info";
import CardView from "@/components/card/card-view";
import ExpoImage from "@/components/expo-image";
import { Button } from "@/components/button";

export default function EditCard() {
  return (
    <View className='w-full flex-1 items-center bg-white p-4'>
      <ScrollView className='w-full'>
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
              <CardView />
              <View className='h-30 border border-input px-3 py-4'>
                <Text className='mb-4'>背景</Text>
                <View className='flex flex-row gap-2'>
                  <ExpoImage
                    source={require("@/assets/background/bg_blue.png")}
                    className='h-14 w-23 border border-input'
                  />
                  <ExpoImage
                    source={require("@/assets/background/bg_red.png")}
                    className='h-14 w-23 border border-input'
                  />
                  <ExpoImage
                    source={require("@/assets/background/bg_yellow.png")}
                    className='h-14 w-23 border border-input'
                  />
                </View>
              </View>
              <View className='h-12 mt-2 border border-input'>
                <Text>フォント</Text>
              </View>
              <Button label='保存してプレビュー' className='mt-6' />
            </View>
          </TabsContent>
        </Tabs>
      </ScrollView>
    </View>
  );
}
