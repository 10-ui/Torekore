import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function App() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (isMounted) {
      router.replace("/login");
    }
  }, [isMounted]);

  return null;
}
