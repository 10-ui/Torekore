import { View, Share } from "react-native";
import { Button } from "@/components/button";
import QRCode from "react-native-qrcode-svg";

export default function Modal() {
  const appLogo = require("@/assets/icon_rounded.png");
  const shareText = async () => {
    try {
      await Share.share({
        message: "https://www.jec.ac.jp",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  return (
    <View className='flex-1 bg-white p-20'>
      <View className='flex items-center gap-4'>
        <QRCode value='https://www.jec.ac.jp' size={180} logo={appLogo} />
        <Button label='カードをシェア' className='mt-6' onPress={shareText} />
      </View>
    </View>
  );
}
