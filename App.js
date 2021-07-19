import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Box,
  extendTheme,
  Heading,
  NativeBaseProvider,
  Stack,
} from "native-base";

import CenterContent from "./components/CenterContent";
import SensorTemperatureCard from "./components/SensorTemperatureCard";
import SensorBrightnessCard from "./components/SensorBrightnessCard";
import SensorInfraredCard from "./components/SensorInfraredCard";

import { useSensorValues } from "./lib/thinger-api";

function SensorValuesSceren() {
  const [sensorValues, isLoading] = useSensorValues();

  return (
    <CenterContent>
      <Stack direction="column" space={3}>
        <Heading color="black">Sensor Values</Heading>

        <SensorTemperatureCard
          loading={isLoading}
          value={sensorValues?.temperature_c}
        />

        <SensorBrightnessCard
          loading={isLoading}
          value={sensorValues?.ldr_precentage}
        />

        <SensorInfraredCard
          loading={isLoading}
          value={sensorValues?.has_living_object}
        />
      </Stack>
    </CenterContent>
  );
}

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
        <SensorValuesSceren />
      </Box>
    </NativeBaseProvider>
  );
}
