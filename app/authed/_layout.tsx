import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <Stack screenOptions={{ header: () => <></> }}>
      <Stack.Screen name='(tabs)' />
    </Stack>
  );
}
