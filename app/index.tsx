import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function App() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      router.replace("/login");
    }
  }, [isMounted]);

  return null; // 画面には何も表示しない
}
