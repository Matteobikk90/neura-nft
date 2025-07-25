/* eslint-disable @typescript-eslint/no-require-imports */
import type { AnimationType } from "@/types/animations";
import type { AnimationObject } from "lottie-react-native";

export const animations: Record<AnimationType, AnimationObject> = {
  loading: require("@/assets/animations/loading.json"),
  error: require("@/assets/animations/error.json"),
  empty: require("@/assets/animations/empty.json"),
};
