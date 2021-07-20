import React from "react";
import { HStack, VStack, Skeleton, Switch, Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import CardBase from "./CardBase";

export default function ActuatorLCDCard({ data, dispatcher, loading }) {
  const onSwitchToggled = () => {
    dispatcher((prev) => ({ backlight: !prev.backlight }));
  };

  const content = loading ? (
    <HStack justifyContent="space-between">
      <Skeleton height={7} width={40} />
      <Skeleton height={7} width={10} />
    </HStack>
  ) : (
    <HStack alignItems="center" justifyContent="space-between">
      <Text>Toggle LCD Backlight</Text>
      <Switch
        onToggle={onSwitchToggled}
        isChecked={data.backlight}
        colorScheme="indigo"
      />
    </HStack>
  );

  return (
    <CardBase
      title="LCD"
      IconProvider={MaterialIcons}
      iconName="monitor"
      centerContent={false}>
      {content}
    </CardBase>
  );
}
