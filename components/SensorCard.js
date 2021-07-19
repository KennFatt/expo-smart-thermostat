import React from "react";
import { Box, VStack, HStack, Text, Heading, Center } from "native-base";

/**
 * Card component that displaying all sensor valus for SensorValuesScreen.
 *
 * @param {{ title: string, description: string, IconProvider: JSX.Element, iconName: string, props: any }}
 */
export default function SensorCard({
  title,
  description,
  IconProvider,
  iconName,
  ...props
}) {
  return (
    <Box bg="gray.100" borderRadius={10} p={2}>
      <VStack space={2}>
        {/* Title */}
        <HStack space={2} alignItems="center">
          {IconProvider && iconName && (
            <IconProvider name={iconName} size={20} color="black" />
          )}
          <Heading size="md" color="black">
            {title}
          </Heading>
        </HStack>

        {/* Description */}
        <Text fontSize="xs">{description}</Text>

        {/* Content */}
        <Center my={2}>{props.children}</Center>
      </VStack>
    </Box>
  );
}
