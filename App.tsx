import { StatusBar } from 'expo-status-bar';
import { Image, Text, View } from 'react-native';
import '@/styles/global.css';
import { Button } from '@/components/button';

export default function App() {
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
      <Image source={require('@/assets/logos/google.svg')} />
      <Text>Googleでログイン</Text>
      <Image source={require('@/assets/logos/X.svg')} />
      <Text>Xでログイン</Text>
      <StatusBar style='auto' />
    </View>
  );
}
