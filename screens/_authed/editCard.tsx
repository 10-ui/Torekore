import { View, Text } from 'react-native';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/tabs';

export default function EditCard() {
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Tabs defaultValue='カード情報'>
        <TabsList>
          <TabsTrigger
            id='カード情報'
            title='カード情報'
            value='カード情報'
          />
          <TabsTrigger
            id='カードスタイル'
            title='カードスタイル'
            value='カードスタイル'
          />
        </TabsList>
        <TabsContent value='カード情報'>
          <Text className='text-primary'>カード情報を編集します</Text>
        </TabsContent>
        <TabsContent value='カードスタイル'>
          <Text className='text-primary'>
            カードスタイルを編集します
          </Text>
        </TabsContent>
      </Tabs>

      <Text>EditCard</Text>
    </View>
  );
}
