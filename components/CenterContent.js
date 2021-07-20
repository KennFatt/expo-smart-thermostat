import React from "react";
import { Box, ScrollView } from "native-base";

/**
 * Component to centering the another component.
 * TODO: Impl responsive design
 *
 * @param {{scrollable: boolean, props: any}}
 */
export default function CenterContent({ scrollable = true, ...props }) {
  const composedBox = (
    <Box
      mx="auto"
      width="100%"
      height="100%"
      maxWidth={{
        base: 328,
        md: 768,
        lg: 1024,
      }}>
      {props.children}
    </Box>
  );

  return scrollable ? (
    <ScrollView
      width="100%"
      height="100%"
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      {composedBox}
    </ScrollView>
  ) : (
    composedBox
  );
}
