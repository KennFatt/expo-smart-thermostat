import React from "react";
import { Heading, VStack } from "native-base";

import CenterContent from "./CenterContent";

/**
 * Base component to maintain screen's layout.
 *
 * @param {{name: string, props: any}}
 */
export default function ScreenBase({ name, ...props }) {
  return (
    <CenterContent>
      <VStack space={{ base: 3, md: 6 }}>
        <Heading color="black">{name ?? "Screen"}</Heading>

        {props.children}
      </VStack>
    </CenterContent>
  );
}
