import React from "react";
import { HStack, Skeleton, Switch, Text, VStack, Slider } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CardBase from "./CardBase";

export default function ActuatorFanCard({ data, dispatcher, loading }) {
  const onSliderChange = (value) => {
    dispatcher((prev) => ({ ...prev, motor_off_brightness_precentage: value }));
  };

  const content = loading ? (
    <VStack space={3}>
      {Array(3)
        .fill(0)
        .map((_, idx) => (
          <HStack key={idx} justifyContent="space-between">
            <Skeleton height={7} width={40} />
            <Skeleton height={7} width={10} />
          </HStack>
        ))}
      <VStack space={2}>
        <Skeleton height={7} width="80%" />
        <Skeleton height={7} width="100%" />
      </VStack>
    </VStack>
  ) : (
    <VStack space={3}>
      <HStack alignItems="center" justifyContent="space-between">
        <Text>Toggle fan motor</Text>
        <Switch
          onToggle={() => {}}
          isChecked={data.motor_active}
          colorScheme="indigo"
        />
      </HStack>

      <HStack alignItems="center" justifyContent="space-between">
        <Text>Toggle static mode</Text>
        <Switch
          onToggle={() => {}}
          isChecked={data.motor_static_moed}
          colorScheme="indigo"
        />
      </HStack>

      <HStack alignItems="center" justifyContent="space-between">
        <Text>Auto turn off on dark</Text>
        <Switch
          onToggle={() => {}}
          isChecked={data.motor_off_brightness}
          colorScheme="indigo"
        />
      </HStack>

      <VStack space={2}>
        <Text>
          Adjust auto turn off brightness{" "}
          {`${data.motor_off_brightness_precentage}%`}
        </Text>

        <Slider
          alignSelf="center"
          defaultValue={data.motor_off_brightness_precentage}
          onChangeEnd={onSliderChange}
          minValue={0}
          maxValue={100}
          step={1}
          colorScheme="indigo">
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
      </VStack>
    </VStack>
  );

  return (
    <CardBase
      title="Fan"
      iconName="fan"
      IconProvider={MaterialCommunityIcons}
      centerContent={false}>
      {content}
    </CardBase>
  );
}
