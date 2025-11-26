import type { Batch } from "../schemas/batch-schemas";
import type { BatchData } from "../schemas/batch-data.schema";

/**
 * Calculates the total completion percentage for a batch based on weight loss
 * @param batch - The batch object containing target weight loss and meat pieces
 * @param batchMetrics - Array of batch data measurements
 * @returns Completion percentage (0-100)
 */
export function calculateTotalCompletionPercentage(
  batch: Batch | undefined,
  batchMetrics: BatchData[]
): number {
  if (!batch || !batchMetrics.length) return 0;

  const targetWeightLoss = batch.weightLoss;
  const latestMetrics = batchMetrics[batchMetrics.length - 1];
  if (!latestMetrics.weightMeasurements) return 0;

  const meatPieceWeightLossPercentages = latestMetrics.weightMeasurements?.map(
    (wm, index) => {
      const initialWeight = batch.meatPieces[index].initialWeight ?? 0;
      const currentWeight = parseFloat(wm.weight.toFixed(2));
      const weightLossPercentage =
        ((initialWeight - currentWeight) / initialWeight) * 100;
      return Math.min((weightLossPercentage / targetWeightLoss) * 100, 100);
    }
  );

  // Return the average completion percentage across all meat pieces
  const total = meatPieceWeightLossPercentages.reduce(
    (acc, val) => acc + val,
    0
  );
  return parseFloat((total / meatPieceWeightLossPercentages.length).toFixed(2));
}
