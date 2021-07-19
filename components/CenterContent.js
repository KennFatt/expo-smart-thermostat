import React from "react";
import { Box, ScrollView } from "native-base";

/**
 * Component to centering the another component.
 * TODO: Impl responsive design
 *
 * @param {{scrollable: boolean, props: any}}
 */
export default function CenterContent({ scrollable = true, ...props }) {
  const ComposedBox = () => (
    <Box
      mx="auto"
      width="100%"
      height="100%"
      maxWidth={{
        base: 328,
      }}>
      {props.children}
    </Box>
  );

  return scrollable ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <ComposedBox />
    </ScrollView>
  ) : (
    <ComposedBox />
  );
}
