import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { Box, extendTheme, NativeBaseProvider } from "native-base";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

import ActuatorsScreen from "./screens/ActuatorsScreen";
import SensorValuesScreen from "./screens/SensorValuesScreen";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const customTheme = extendTheme({
    colors: {
      black: "#111827",
      white: "#F9FAFB",
    },
  });

  return (
    <NativeBaseProvider theme={customTheme}>
      <StatusBar style="auto" />
      <Box safeArea minH="100%" bg="white">
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="SensorsValues"
            barStyle={{ backgroundColor: "#6366F1" }}>
            <Tab.Screen
              name="SensorValues"
              component={SensorValuesScreen}
              options={{
                tabBarLabel: "Sensor Values",
                tabBarIcon: ({ color }) => (
                  <FontAwesome5
                    name="temperature-high"
                    color={color}
                    size={20}
                  />
                ),
              }}
              tab
            />
            <Tab.Screen
              name="Actuators"
              component={ActuatorsScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="fan" size={20} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Box>
    </NativeBaseProvider>
  );
}
