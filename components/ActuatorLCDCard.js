import React from "react";
import { HStack, Skeleton, Switch, Text, Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import { useDeviceLCDPropertyAPI } from "../lib/thinger-api";
import CardBase from "./CardBase";

export default function ActuatorLCDCard() {
  const [data, dispatcher, isLoading, updater] = useDeviceLCDPropertyAPI();

  const content = isLoading ? (
    <HStack justifyContent="space-between">
      <Skeleton height={7} width={40} />
      <Skeleton height={7} width={10} />
    </HStack>
  ) : (
    <HStack alignItems="center" justifyContent="space-between">
      <Text>Toggle LCD Backlight</Text>
      <Switch
        onToggle={() => {
          dispatcher((prev) => ({ backlight: !prev.backlight }));
        }}
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

      <Button
        colorScheme="indigo"
        isDisabled={isLoading}
        onPress={updater}
        my={{ md: 4 }}>
        UPDATE
      </Button>
    </CardBase>
  );
}
