import { projectId } from "@/constants/variables";
import { chains, metadata } from "@/constants/web3";
import "@ethersproject/shims";
import {
  createAppKit,
  defaultConfig,
} from "@reown/appkit-ethers5-react-native";

const config = defaultConfig({ metadata });

createAppKit({
  projectId,
  chains,
  config,
  enableAnalytics: true,
});
