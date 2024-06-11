import { View, Text } from 'react-native';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { Image } from 'expo-image';


export default function Signup() {
  return (
    <View className='flex-1 items-center justify-center bg-white px-13'>
    <Button
      label='ログイン'
      
    />
    <Button label='初めて利用される方はこちら' variant='outline' />
    <Image
      source={require('@/assets/logos/google.svg')}
      style={{ width: 50, height: 50 }}
    />
    <Text>Googleで連携</Text>
    <Image
      source={require('@/assets/logos/X.svg')}
      style={{ width: 50, height: 50 }}
    />  
    <Text>Xで連携</Text>
  </View>
  );
};
