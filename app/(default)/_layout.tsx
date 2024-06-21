import { Stack } from "expo-router";

export default function DefaultRootLayout() {
  return (
    <Stack>
      <Stack.Screen name='signup' />
      <Stack.Screen name='login' />
    </Stack>
  );
}
