import { useColorScheme } from "@/hooks/useColorScheme";
import { persistor, store } from "@/redux/store";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Regular: require("../assets/fonts/Hellix-Regular.ttf"),
    Medium: require("../assets/fonts/Hellix-Medium.ttf"),
    SemiBold: require("../assets/fonts/Hellix-SemiBold.ttf"),
    Bold: require("../assets/fonts/Hellix-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack
            initialRouteName="auth/onboarding"
            screenOptions={{ headerShown: false }}
          ></Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
