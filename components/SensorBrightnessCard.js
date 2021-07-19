import React from "react";
import { Entypo } from "@expo/vector-icons";
import { Skeleton, Text } from "native-base";

import SensorCard from "./SensorCard";

/**
 * Component to display the LDR's value.
 *
 * @param {{loading: boolean, value: number|undefined}}
 */
export default function SensorBrightnessCard({ loading, value }) {
  return (
    <SensorCard
      title="Brightness"
      description="Current room brightness based on its light intensity."
      IconProvider={Entypo}
      iconName="light-up">
      {loading ? (
        <Skeleton variant="rect" height={12} alignSelf="baseline" mx={20} />
      ) : (
        <Text
          color="black"
          fontSize="4xl"
          fontWeight="bold">{`${value}%`}</Text>
      )}
    </SensorCard>
  );
}
