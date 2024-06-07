import React from 'react';
import { Button } from '@/components/button';
import { Text, View } from 'react-native';

export default function Login({
  setAuthentication,
}: {
  setAuthentication: (state: boolean) => void;
}) {
  return (
    <View className='flex-1 items-center justify-center'>
      <Text className='text-2xl font-bold'>Login</Text>
      <Button
        label='Login'
        onPress={() => setAuthentication(true)}
        className='text-5xl'
      />
    </View>
  );
}
