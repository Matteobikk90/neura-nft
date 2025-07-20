import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";

export async function copyToClipboard(value: string, message?: string) {
  try {
    await Clipboard.setStringAsync(value);
    Toast.show({
      type: "success",
      text1: message || "Copied to clipboard",
    });
  } catch (error) {
    console.error("Clipboard error:", error);
    Toast.show({
      type: "error",
      text1: "Clipboard Error",
      text2: error instanceof Error ? error.message : String(error),
    });
  }
}
