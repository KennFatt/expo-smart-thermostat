import React from "react";
import { Box, VStack, HStack, Text, Heading, Center } from "native-base";

/**
 * Card component that displaying all sensor valus for SensorValuesScreen.
 *
 * @param {{ title: string, description: string, IconProvider: JSX.Element, iconName: string, centerContent: boolean, props: any }}
 */
export default function CardBase({
  title,
  description,
  IconProvider,
  iconName,
  centerContent = true,
  ...props
}) {
  return (
    <Box bg="gray.100" borderRadius={10} p={2}>
      <VStack space={2}>
        {/* Title */}
        {title && (
          <HStack space={2} alignItems="center">
            {IconProvider && iconName && (
              <IconProvider name={iconName} size={20} color="black" />
            )}
            <Heading size="md" color="black">
              {title}
            </Heading>
          </HStack>
        )}

        {/* Description */}
        {description && <Text fontSize="xs">{description}</Text>}

        {/* Content */}
        {centerContent ? (
          <Center my={2}>{props.children}</Center>
        ) : (
          props.children
        )}
      </VStack>
    </Box>
  );
}
