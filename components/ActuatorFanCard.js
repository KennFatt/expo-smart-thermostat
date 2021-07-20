import React from "react";
import {
  HStack,
  Skeleton,
  Switch,
  Text,
  VStack,
  Slider,
  Button,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CardBase from "./CardBase";
import { useDeviceFanPropertyAPI } from "../lib/thinger-api";

export default function ActuatorFanCard() {
  const [data, dispatcher, isLoading, updater] = useDeviceFanPropertyAPI();

  const content = isLoading ? (
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
    <VStack space={{ base: 3, md: 4 }}>
      <HStack alignItems="center" justifyContent="space-between">
        <Text>Toggle fan motor</Text>
        <Switch
          onToggle={() =>
            dispatcher((prev) => ({
              ...prev,
              motor_active: !prev.motor_active,
            }))
          }
          isChecked={data.motor_active}
          colorScheme="indigo"
        />
      </HStack>

      <VStack space={2}>
        <Text>Desired room temperature: {`${data.desired_temperature}°C`}</Text>

        <Slider
          alignSelf="center"
          defaultValue={data.desired_temperature}
          onChangeEnd={(value) => {
            dispatcher((prev) => ({
              ...prev,
              desired_temperature: value,
            }));
          }}
          minValue={-127}
          maxValue={127}
          step={1}
          colorScheme="indigo">
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
      </VStack>

      <VStack space={2}>
        <Text>
          Desired room temperature threshold:{" "}
          {`${data.desired_temperature_threshold}°C`}
        </Text>

        <Slider
          alignSelf="center"
          defaultValue={data.desired_temperature_threshold}
          onChangeEnd={(value) => {
            dispatcher((prev) => ({
              ...prev,
              desired_temperature_threshold: value,
            }));
          }}
          minValue={0}
          maxValue={15}
          step={1}
          colorScheme="indigo">
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
      </VStack>

      <HStack alignItems="center" justifyContent="space-between">
        <Text>Toggle static mode</Text>
        <Switch
          onToggle={() =>
            dispatcher((prev) => ({
              ...prev,
              motor_static_mode: !prev.motor_static_mode,
            }))
          }
          isChecked={data.motor_static_mode}
          colorScheme="indigo"
        />
      </HStack>

      <HStack alignItems="center" justifyContent="space-between">
        <Text>Auto turn off on dark</Text>
        <Switch
          onToggle={() =>
            dispatcher((prev) => ({
              ...prev,
              motor_off_brightness: !prev.motor_off_brightness,
            }))
          }
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
          onChangeEnd={(value) => {
            dispatcher((prev) => ({
              ...prev,
              motor_off_brightness_precentage: value,
            }));
          }}
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
