import React from "react";
import { StatusBar } from "expo-status-bar";
import { Box, extendTheme, NativeBaseProvider } from "native-base";

import ActuatorsScreen from "./screens/ActuatorsScreen";
import SensorValuesScreen from "./screens/SensorValuesScreen";

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
        <ActuatorsScreen />
      </Box>
    </NativeBaseProvider>
  );
}
