import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/tabs";
import CardInfo from "@/components/card/card-info";
import CardStyle from "@/components/card/card-style";

export default function EditCard() {
  return (
    <KeyboardAvoidingView
      behavior='position'
      className='bg-appBG flex-1 items-center'>
      <View className='w-screen p-4'>
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
              <CardStyle />
            </TabsContent>
          </Tabs>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
