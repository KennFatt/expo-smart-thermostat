import React from "react";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Skeleton, Text, HStack } from "native-base";

import SensorCard from "./SensorCard";

/**
 * Component to display the Temperature's value.
 *
 * @param {{loading: boolean, value: number|undefined}}
 */
export default function SensorTemperatureCard({ loading, value }) {
  return (
    <SensorCard
      title="Temperature"
      description="Current room temperature in Celcius unit."
      IconProvider={FontAwesome5}
      iconName="temperature-low">
      {loading ? (
        <Skeleton variant="rect" height={12} alignSelf="baseline" mx={20} />
      ) : (
        <HStack alignItems="center" space={1}>
          <Text color="black" fontSize="4xl" fontWeight="bold">
            {value?.toFixed(2)}
          </Text>
          <MaterialCommunityIcons
            name="temperature-celsius"
            size={36}
            color="black"
          />
        </HStack>
      )}
    </SensorCard>
  );
}