import { Pressable, Text } from "react-native";
import { useAppKit } from "@reown/appkit-ethers5-react-native";

export default function WalletScreen() {
  const { open } = useAppKit();

  return (
    <>
      <Pressable onPress={() => open()}>
        <Text>Open Connect Modal</Text>
      </Pressable>
    </>
  );
}
