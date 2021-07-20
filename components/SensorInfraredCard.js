import React from "react";
import {
  FontAwesome5,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Skeleton, Text, VStack } from "native-base";

import CardBase from "./CardBase";

/**
 * Component to display the PIR's value.
 *
 * @param {{loading: boolean, value: boolean|undefined}}
 */
export default function SensorInfraredCard({ loading, value }) {
  return (
    <CardBase
      title="Living Object"
      description="Check if whether there is any living object inside the room."
      IconProvider={FontAwesome5}
      iconName="people-arrows">
      <VStack alignItems="center" space={2}>
        {loading ? (
          <>
            <Skeleton variant="circle" size={16} />
            <Skeleton variant="text" height={6} alignItems="center" mx={20} />
          </>
        ) : value ? (
          <>
            <Fontisto name="persons" color="black" size={42} />
            <Text color="black">There is somebody inside the room</Text>
          </>
        ) : (
          <>
            <MaterialCommunityIcons name="null" color="black" size={48} />
            <Text color="black">The room is empty</Text>
          </>
        )}
      </VStack>
    </CardBase>
  );
}
