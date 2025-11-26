import type { BatchData } from "../schemas/batch-data.schema";
import { getRandomColor } from "./helpers";

export function getWeightLossOverTimeChartData(batchData: BatchData[]) {
  if (batchData.length === 0) {
    return {
      labels: [],
      datasets: [],
    };
  }

  // Sample every 25th data point to reduce clutter
  const filteredData = batchData.filter((_, index) => index % 30 === 0);

  const labels = filteredData.map((data) =>
    new Date(data.timeStamp).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  // Create an array for each meat piece to hold its weight loss data
  const meatPieceData: number[][] = Array.from(
    { length: filteredData[0]?.weightMeasurements?.length ?? 0 },
    () => []
  );
  filteredData.forEach(({ weightMeasurements }) => {
    weightMeasurements?.forEach((weight, index) => {
      meatPieceData[index].push(parseFloat(weight.weight.toFixed(2)));
    });
  });

  const datasets = meatPieceData.map((data, index) => {
    return {
      label: `Biltong Piece ${index + 1}`,
      data,
      fill: false,
      // Need a random color for each line
      borderColor: getRandomColor(),
      tension: 0.4,
    };
  });

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

export const weightLossChartOptions = {
  maintainAspectRatio: false,
  aspectRatio: 0.6,
  animation: {
    duration: 300, // Smooth transition duration
    easing: "easeInOutQuart",
  },
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
