/**
 * Transforming raw data to be applied with React Native Chart Kit library.
 *
 * @param {object} data Data retrieved from Data Buckets API
 * @returns {{labels: any[], datasets: { temperature: any[], ldr: any[] }}}
 */
export function transformTemperatureLDRData(data) {
  const fallback = {
    labels: [],
    datasets: {
      temperature: [],
      ldr: [],
    },
  };

  if (!data) {
    return fallback;
  }

  return data.reduce((result, entry) => {
    const timestamp = new Date(entry.ts).toLocaleTimeString();
    const temperature = entry.val.temperature_c;
    const ldr = entry.val.ldr_precentage;

    result.labels.push(`${timestamp}`);
    result.datasets.temperature.push(temperature);
    result.datasets.ldr.push(ldr);

    return result;
  }, fallback);
}
