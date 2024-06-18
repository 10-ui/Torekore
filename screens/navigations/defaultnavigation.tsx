import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Signup from "@/screens/_default/signup";
import Login from "@/screens/_default/login";
import { RootStackParamList } from "@/types/types";

const Stack = createStackNavigator<RootStackParamList>();

export default function DefaultNavigation({
  setAuthentication,
}: {
  setAuthentication: (state: boolean) => void;
}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' initialParams={{ setAuthentication }}>
        {(props) => <Login {...props} setAuthentication={setAuthentication} />}
      </Stack.Screen>
      <Stack.Screen name='Signup' component={Signup} />
    </Stack.Navigator>
  );
}
