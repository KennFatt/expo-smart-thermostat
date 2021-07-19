import { useEffect, useState } from "react";

import { API_HOSTNAME, API_USERNAME, API_DEVICE_NAME, API_TOKEN } from "@env";

/**
 * List of thinger.io API endpoints.
 * - Device Resources
 * - TODO: Device Property
 * - TODO: Data Buckets
 */
const API_ENDPOINTS = {
  device_resource: `${API_HOSTNAME}/v3/users/${API_USERNAME}/devices/${API_DEVICE_NAME}/resources`,
};

/**
 * Retrieving the data from Device Resources API endpoint with
 *  given specific resource name.
 *
 * @param {string} resourceName Device's resource name
 * @returns Promise<object>
 */
async function getDeviceResourcesAPI(resourceName) {
  const headers = {
    Accept: "*/*",
    Authorization: `Bearer ${API_TOKEN}`,
  };

  const endPointUrl = `${API_ENDPOINTS.device_resource}/${resourceName}`;
  const response = await fetch(endPointUrl, {
    method: "GET",
    headers,
  });

  return await response.json();
}

/**
 * Custom React hook to fetch all the sensors's value from the endpoint.
 * Returning an array with index 0 = data, 1 = loading state.
 *
 * TODO: Error handling
 *
 * @returns any[]
 */
export function useSensorValues() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [temperatureAndLDR, infrared] = await Promise.all([
        getDeviceResourcesAPI("sensor_values"),
        getDeviceResourcesAPI("pir_sensor_value"),
      ]);

      setData({ ...temperatureAndLDR, ...infrared });
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return [data, isLoading];
}
