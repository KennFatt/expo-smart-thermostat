import React from "react";
import { Dimensions } from "react-native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import * as Device from "expo-device";
import { LineChart } from "react-native-chart-kit";
import { Button, Skeleton } from "native-base";

import { useDataBucketAPI } from "../lib/thinger-api";
import { transformTemperatureLDRData } from "../lib/visualization-helper";
import CardBase from "../components/CardBase";
import ScreenBase from "../components/ScreenBase";

/**
 * Screen to show all statistic and data data visualization from device's Data Buckets.
 */
export default function StatisticScreen() {
  const [data, isLoading, refresher] = useDataBucketAPI(
    "smart_thermostat_temp_ldr",
    60
  );
  const transformedData = transformTemperatureLDRData(data);
  const chartWidthDivider = Device.isDevice ? 1.15 : 1.5;

  return (
    <ScreenBase name="Statistic">
      <CardBase
        title="Temperature"
        description="Room's temperature records for past 60 minutes.."
        IconProvider={FontAwesome5}
        iconName="temperature-low">
        {isLoading ? (
          <Skeleton
            height="256px"
            width={`${Dimensions.get("window").width / chartWidthDivider}px`}
            variant="rect"
          />
        ) : (
          <LineChart
            data={{
              labels: transformedData.labels.reverse(),
              datasets: [
                {
                  data: transformedData.datasets.temperature.reverse(),
                },
              ],
            }}
            width={Dimensions.get("window").width / chartWidthDivider}
            height={256}
            yAxisSuffix="°C"
            withVerticalLabels={false}
            chartConfig={{
              backgroundColor: "#6366F1",
              backgroundGradientFrom: "#6366F1",
              backgroundGradientTo: "#6366F1",
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: () => `rgba(255, 255, 255, 1)`,
              style: {
                borderRadius: 8,
              },
              propsForDots: {
                r: "4",
                fill: "#c7d2fe",
                strokeWidth: "1",
                stroke: "#4338ca",
              },
              propsForVerticalLabels: {
                fontSize: "8px",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 8,
              alignSelf: "center",
            }}
          />
        )}
      </CardBase>

      <CardBase
        title="Brightness"
        description="Room's brightness records for past 60 minutes."
        IconProvider={Entypo}
        iconName="light-up">
        {isLoading ? (
          <Skeleton
            height="256px"
            width={`${Dimensions.get("window").width / chartWidthDivider}px`}
            variant="rect"
          />
        ) : (
          <LineChart
            data={{
              labels: transformedData.labels.reverse(),
              datasets: [
                {
                  data: transformedData.datasets.ldr.reverse(),
                },
              ],
            }}
            width={Dimensions.get("window").width / chartWidthDivider}
            height={256}
            yAxisSuffix="%"
            withVerticalLabels={false}
            chartConfig={{
              backgroundColor: "#6366F1",
              backgroundGradientFrom: "#6366F1",
              backgroundGradientTo: "#6366F1",
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: () => `rgba(255, 255, 255, 1)`,
              style: {
                borderRadius: 8,
              },
              propsForDots: {
                r: "4",
                fill: "#c7d2fe",
                strokeWidth: "1",
                stroke: "#4338ca",
              },
              propsForVerticalLabels: {
                fontSize: "8px",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 8,
              alignSelf: "center",
            }}
          />
        )}
      </CardBase>

      <Button colorScheme="indigo" onPress={refresher} isDisabled={isLoading}>
        REFRESH
      </Button>
    </ScreenBase>
  );
}
