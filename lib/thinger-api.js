import { useEffect, useMemo, useState } from "react";

import {
  API_HOSTNAME,
  API_USERNAME,
  API_DEVICE_NAME,
  API_TOKEN,
  API_TOKEN_BUCKET,
} from "@env";

/**
 * List of thinger.io API endpoints.
 * - Device Resources
 * - Device Property
 * - TODO: Data Buckets
 */
const API_ENDPOINTS = {
  device_resources: `${API_HOSTNAME}/v3/users/${API_USERNAME}/devices/${API_DEVICE_NAME}/resources`,
  device_properties: `${API_HOSTNAME}/v3/users/${API_USERNAME}/devices/${API_DEVICE_NAME}/properties`,
};

/**
 * Generic GET request method function generator.
 *
 * @param {string} endpointUrl API Endpoint @see API_ENDPOINTS
 * @param {string} bearerToken Bearer token to accessing the API
 */
function createGetRequest(endpointUrl, bearerToken) {
  /**
   * @param {string} additionalPath
   * @return {Promise<object>}
   */
  return async function (additionalPath) {
    const response = await fetch(
      `${endpointUrl}${additionalPath ? `/${additionalPath}` : ""}`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );

    return await response.json();
  };
}

/**
 * Custom React hook to fetch all the sensors's value from the endpoint.
 * Returning an array with index 0 = data, 1 = loading state.
 *
 * TODO: Error handling
 *
 * @returns any[]
 */
export function useSensorValuesAPI() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDeviceResources = createGetRequest(
      API_ENDPOINTS.device_resources,
      API_TOKEN
    );

    const fetchData = async () => {
      const [temperatureAndLDR, infrared] = await Promise.all([
        getDeviceResources("sensor_values"),
        getDeviceResources("pir_sensor_value"),
      ]);

      setData({ ...temperatureAndLDR, ...infrared });
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return [data, isLoading];
}

export function useDevicePropertiesAPI() {
  const [lcdData, setLcdData] = useState({});
  const [fanData, setFanData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDeviceProperties = createGetRequest(
      API_ENDPOINTS.device_properties,
      API_TOKEN
    );

    const fetchData = async () => {
      let filteredData = {};

      const responseData = await getDeviceProperties();
      if (responseData.length > 0) {
        responseData.forEach((deviceProperty) => {
          switch (deviceProperty.property) {
            case "fan_state":
              setFanData(deviceProperty.value);
              break;
            case "lcd_state":
              setLcdData(deviceProperty.value);
              break;
            default:
              break;
          }
        });
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const data = useMemo(
    () => ({ lcdData, setLcdData, fanData, setFanData }),
    [lcdData, fanData]
  );

  return [data, isLoading];
}
