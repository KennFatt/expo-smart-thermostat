import React from "react";

import SensorTemperatureCard from "../components/SensorTemperatureCard";
import SensorBrightnessCard from "../components/SensorBrightnessCard";
import SensorInfraredCard from "../components/SensorInfraredCard";
import ScreenBase from "../components/ScreenBase";

import { useSensorValuesAPI } from "../lib/thinger-api";
import { Button } from "native-base";

/**
 * Screen to show all the sensor values.
 */
export default function SensorValuesScreen() {
  const [sensorValues, isLoading, refresher] = useSensorValuesAPI();

  return (
    <ScreenBase name="Sensor Values">
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

      <Button colorScheme="indigo" onPress={refresher} isDisabled={isLoading}>
        REFRESH
      </Button>
    </ScreenBase>
  );
}
