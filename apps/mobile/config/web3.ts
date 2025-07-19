import "@walletconnect/react-native-compat";
import "@ethersproject/shims";
import {
  createAppKit,
  defaultConfig,
} from "@reown/appkit-ethers5-react-native";
import { chains, metadata } from "@/constants/web3";
import { projectId } from "@/constants/variables";

const config = defaultConfig({ metadata });

createAppKit({
  projectId,
  chains,
  config,
  enableAnalytics: true,
});
