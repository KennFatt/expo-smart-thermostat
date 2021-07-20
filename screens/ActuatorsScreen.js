import React from "react";

import ScreenBase from "../components/ScreenBase";
import ActuatorLCDCard from "../components/ActuatorLCDCard";
import ActuatorFanCard from "../components/ActuatorFanCard";

export default function ActuatorsScreen() {
  return (
    <ScreenBase name="Actuators">
      <ActuatorLCDCard />
      <ActuatorFanCard />
    </ScreenBase>
  );
}
