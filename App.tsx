import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthedNavigation from "@/screens/navigations/authednavigation";
import DefaultNavigation from "@/screens/navigations/defaultnavigation";
import "@/styles/global.css";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const setAuthentication = (state: boolean) => {
    setIsAuthenticated(state);
  };
  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AuthedNavigation />
      ) : (
        <DefaultNavigation setAuthentication={setAuthentication} />
      )}
    </NavigationContainer>
  );
}
