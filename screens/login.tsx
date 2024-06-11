import { Button } from '@/components/button';
import { Image } from 'expo-image';
import { Text, View } from 'react-native';
import { Input } from '@/components/input';

export default function Login({
  setAuthentication,
}: {
  setAuthentication: (state: boolean) => void;
}) {
  return (
    <View className='flex-1 items-center justify-center bg-white px-13'>
      <Image
        source={require('@/assets/logos/applogo.svg')}
        style={{ width: 100, height: 100 }}
      />
      <Input
        label='メールアドレス'
        placeholder='メールアドレスを入力してください'  
      />
      <Input
        label='パスワード'
        placeholder='パスワードを入力してください'  
      />
      <Button
        label='ログイン'
        onPress={() => setAuthentication(true)}
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
      <Text>イーロンマスクと恋愛</Text>
    </View>
  );
}
