import { Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Button } from '@/components/button';

export default function Home() {
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Button
        label='Button'
        onPress={() => console.log('Button pressed')}
      />
      <Button
        label='Button'
        onPress={() => console.log('Button pressed')}
      />
      <Image
        source={require('@/assets/logos/google.svg')}
        style={{ width: 50, height: 50 }}
      />
      <Text>Googleでログイン</Text>
      <Image
        source={require('@/assets/logos/X.svg')}
        style={{ width: 50, height: 50 }}
      />
      <Text>Xでログイン</Text>
    </View>
  );
}
