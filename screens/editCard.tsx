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
      <Tabs defaultValue='account'>
        <TabsList>
          <TabsTrigger id='account' title='Account' value='account' />
          <TabsTrigger
            id='password'
            title='Password'
            value='password'
          />
        </TabsList>
        <TabsContent value='account'>
          <Text className='text-primary'>
            Make changes to your account here.
          </Text>
        </TabsContent>
        <TabsContent value='password'>
          <Text className='text-primary'>
            Change your password here.
          </Text>
        </TabsContent>
      </Tabs>

      <Text>EditCard</Text>
    </View>
  );
}
