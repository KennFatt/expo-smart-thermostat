import React from "react";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Skeleton, Text, HStack } from "native-base";

import CardBase from "./CardBase";

/**
 * Component to display the Temperature's value.
 *
 * @param {{loading: boolean, value: number|undefined}}
 */
export default function SensorTemperatureCard({ loading, value }) {
  return (
    <CardBase
      title="Temperature"
      description="Current room temperature in Celcius unit."
      IconProvider={FontAwesome5}
      iconName="temperature-low">
      {loading ? (
        <Skeleton
          variant="rect"
          height={12}
          alignSelf="baseline"
          mx={20}
          _web={{
            alignSelf: "center",
            width: "50%",
          }}
        />
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
    </CardBase>
  );
}
