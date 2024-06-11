import React from 'react';
import Navigations from '@/screens/navigations';
import Login from '@/screens/login';
import '@/styles/global.css';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const setAuthentication = (state: boolean) => {
    setIsAuthenticated(state);
  };
  return !isAuthenticated ? (
    <Login setAuthentication={setAuthentication} />
  ) : (
    <Navigations />
  );
}
