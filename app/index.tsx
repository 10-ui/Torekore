import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAppStateStore } from "@/utils/store";

export default function App() {
  const router = useRouter();
  const { session, isMounted } = useAppStateStore();
  const setIsMounted = useAppStateStore((state) => state.setIsMounted);

  useEffect(() => {
    setIsMounted(true);
    if (isMounted) {
      router.replace(session ? "/authed" : "/login");
    }
  }, [isMounted]);

  return null;
}
