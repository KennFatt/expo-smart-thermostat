import { useCallback, useEffect, useState } from "react";

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

/** Function to call Device Property API with HTTP GET method */
const getPropertyAPI = createGetRequest(
  API_ENDPOINTS.device_properties,
  API_TOKEN
);

/** Function to call Device Resource API with HTTP GET method */
const getResourceAPI = createGetRequest(
  API_ENDPOINTS.device_resources,
  API_TOKEN
);

/** Function to call Device Property API with HTTP PUT method */
const putPropertyAPI = createPutRequest(
  API_ENDPOINTS.device_properties,
  API_TOKEN
);

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

    return await response;
  };
}

/**
 * Generic PUT request method function generator.
 *
 * @param {string} endpointUrl API Endpoint @see API_ENDPOINTS
 * @param {string} bearerToken Bearer token to accessing the API
 */
function createPutRequest(endpointUrl, bearerToken) {
  return async function (additionalPath, jsonBody) {
    if (typeof jsonBody === "undefined") {
      throw new Error(
        "Put request should has a body! `jsonBody` param is undefined!"
      );
    }

    const response = await fetch(
      `${endpointUrl}${additionalPath ? `/${additionalPath}` : ""}`,
      {
        method: "PUT",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonBody),
      }
    );

    return response;
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
    const fetchData = async () => {
      const [temperatureAndLDR, infrared] = await Promise.all([
        getResourceAPI("sensor_values"),
        getResourceAPI("pir_sensor_value"),
      ]).then(async ([first, second]) => [
        await first.json(),
        await second.json(),
      ]);

      setData({ ...temperatureAndLDR, ...infrared });
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return [data, isLoading];
}

/**
 * Custom hook to manipulating Device's Property with field `lcd_state`.
 */
export function useDeviceLCDPropertyAPI() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await (await getPropertyAPI("lcd_state")).json();
      setData({ ...response.value });
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const updater = useCallback(() => {
    const putData = async () => {
      setIsLoading(true);

      const putResponse = await putPropertyAPI("lcd_state", { value: data });
      if (putResponse.ok) {
        const getResponse = await getResourceAPI("sync");
        if (getResponse.ok) {
          const newData = await putResponse.json();
          setData({ ...newData.value });
          setIsLoading(false);
        }
      }
    };

    putData();
  }, [data]);

  return [data, setData, isLoading, updater];
}

/**
 * Custom hook to manipulating Device's Property with field `fan_state`.
 */
export function useDeviceFanPropertyAPI() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await (await getPropertyAPI("fan_state")).json();
      setData({ ...response.value });
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const updater = useCallback(() => {
    const putData = async () => {
      setIsLoading(true);

      const putResponse = await putPropertyAPI("fan_state", { value: data });
      if (putResponse.ok) {
        const getResponse = await getResourceAPI("sync");
        if (getResponse.ok) {
          const newData = await putResponse.json();
          setData({ ...newData.value });
          setIsLoading(false);
        }
      }
    };

    putData();
  }, [data]);

  return [data, setData, isLoading, updater];
}
