import React from "react";

import ScreenBase from "../components/ScreenBase";
import { useDevicePropertiesAPI } from "../lib/thinger-api";
import ActuatorLCDCard from "../components/ActuatorLCDCard";
import ActuatorFanCard from "../components/ActuatorFanCard";

export default function ActuatorsScreen() {
  const [data, isLoading] = useDevicePropertiesAPI();

  return (
    <ScreenBase name="Actuators">
      <ActuatorLCDCard
        data={data?.lcdData}
        dispatcher={data.setLcdData}
        loading={isLoading}
      />

      <ActuatorFanCard
        data={data?.fanData}
        dispatcher={data.setFanData}
        loading={isLoading}
      />
    </ScreenBase>
  );
}
