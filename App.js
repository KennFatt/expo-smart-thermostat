import React from "react";
import { StatusBar } from "expo-status-bar";
import { Box, extendTheme, NativeBaseProvider } from "native-base";

import ScreenActuators from "./screens/ScreenActuators";
import ScreenSensorValues from "./screens/ScreenSensorValues";

export default function App() {
  const customTheme = extendTheme({
    colors: {
      black: "#111827",
      white: "#F9FAFB",
    },
  });

  return (
    <NativeBaseProvider theme={customTheme}>
      <StatusBar style="auto" />
      <Box safeArea h="100%" bg="white">
        <ScreenActuators />
      </Box>
    </NativeBaseProvider>
  );
}
