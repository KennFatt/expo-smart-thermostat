import React, { useState } from "react";
import { HStack, Switch, Text } from "native-base";

import ScreenBase from "./ScreenBase";

export default function ScreenActuators() {
  const [lcdBacklight, setLcdBacklight] = useState(false);
  const onSwitchToggled = () => {
    setLcdBacklight((prev) => !prev);
  };

  return (
    <ScreenBase name="Actuators">
      {/* Each row should has 2 column */}
      <HStack alignItems="center" justifyContent="space-between">
        <Text>Toggle LCD backlight</Text>

        {/* TODO: synchronizing `isChecked` will make the UI looks cluttering, any workaround? onanimationend? */}
        <Switch onToggle={onSwitchToggled} isChecked={lcdBacklight} />
      </HStack>
    </ScreenBase>
  );
}
