import { useEffect } from "react";
import { Slot } from "expo-router";
import { supabase } from "@/utils/supabase";
import { useAppStateStore } from "@/utils/store";
import "@/styles/global.css";

const InitialLayout = () => {
  const setSession = useAppStateStore((state) => state.setSession);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return <Slot />;
};

const RootLayout = () => {
  return <InitialLayout />;
};

export default RootLayout;
