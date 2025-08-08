import axios from "axios";
import { Platform } from "react-native";
import Constants from "expo-constants";

function resolveBaseURL(): string {
    // Allow explicit override via env or app config
    const envUrl = (Constants?.expoConfig as any)?.extra?.API_URL || process.env.EXPO_PUBLIC_API_URL;
    if (envUrl) return envUrl as string;

    // Try to infer host IP from Expo dev server
    const hostUri: string | undefined = (Constants?.expoConfig as any)?.hostUri;
    const inferredHost = hostUri ? hostUri.split(":")[0] : undefined;
    if (inferredHost) return `http://${inferredHost}:3000/api`;

    // Fallbacks: emulator vs. simulator
    if (Platform.OS === "android") return "http://10.0.2.2:3000/api";
    return "http://localhost:3000/api";
}

const api = axios.create({
  baseURL: resolveBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;