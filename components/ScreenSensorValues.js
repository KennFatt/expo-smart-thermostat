import React from "react";

import SensorTemperatureCard from "./SensorTemperatureCard";
import SensorBrightnessCard from "./SensorBrightnessCard";
import SensorInfraredCard from "./SensorInfraredCard";
import ScreenBase from "./ScreenBase";

import { useSensorValues } from "../lib/thinger-api";

/**
 * Screen to show all the sensor values.
 */
export default function ScreenSensorValues() {
  const [sensorValues, isLoading] = useSensorValues();

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
    </ScreenBase>
  );
}
