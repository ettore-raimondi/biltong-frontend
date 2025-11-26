import type { BatchData } from "../schemas/batch-data.schema";

export function getTempAndHumidityOverTime(batchData: BatchData[]) {
  // Sample every 25th data point to reduce clutter
  const filteredData = batchData.filter((_, index) => index % 30 === 0);

  const labels = filteredData.map((data) =>
    new Date(data.timeStamp).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const temperatureData = filteredData.map((data) => data.temperature);
  const humidityData = filteredData.map((data) => data.humidity);

  const datasets = [
    {
      label: "Temperature (°C) over Time",
      data: temperatureData,
      fill: false,
      borderColor: documentStyle.getPropertyValue("--red-500") || "#EF4444", // Red
      backgroundColor: documentStyle.getPropertyValue("--red-100") || "#FEE2E2",
      tension: 0.4,
    },
    {
      label: "Humidity (%) over Time",
      data: humidityData,
      fill: false,
      borderColor: documentStyle.getPropertyValue("--blue-500") || "#3B82F6", // Blue
      backgroundColor:
        documentStyle.getPropertyValue("--blue-100") || "#3B82F6",
      tension: 0.4,
    },
  ];

  return {
    labels,
    datasets,
  };
}

const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue("--text-color");
const textColorSecondary = documentStyle.getPropertyValue(
  "--text-color-secondary"
);
const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

export const tempHumidityChartSettings = {
  maintainAspectRatio: false,
  aspectRatio: 0.6,
  plugins: {
    legend: {
      labels: {
        color: textColor,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: textColorSecondary,
      },
      grid: {
        color: surfaceBorder,
      },
    },
    y: {
      ticks: {
        color: textColorSecondary,
      },
      grid: {
        color: surfaceBorder,
      },
    },
  },
};
