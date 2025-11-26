import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { Batch } from "../schemas/batch-schemas";
import type { BatchData } from "../schemas/batch-data.schema";
import apiClient from "../services/api-service";
import { calculateTotalCompletionPercentage } from "../helpers/batch-helpers";

interface UseBatchMetricsOptions {
  refetchInterval?: number;
  enabled?: boolean;
}

interface UseBatchMetricsReturn {
  batchMetrics: BatchData[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  percentageComplete: number | null;
}

/**
 * Custom hook to fetch batch metrics and calculate completion percentage
 * @param batchId - The ID of the batch to fetch metrics for
 * @param batch - The batch object (optional, for calculating completion)
 * @param options - Configuration options for the query
 * @returns Object containing metrics data, loading state, and completion percentage
 */
export function useBatchMetrics(
  batchId: number | undefined,
  batch?: Batch,
  options: UseBatchMetricsOptions = {}
): UseBatchMetricsReturn {
  const { refetchInterval = 2000, enabled = true } = options;
  const [percentageComplete, setPercentageComplete] = useState<number | null>(
    null
  );

  const {
    data: batchMetrics,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["batchMetrics", batchId],
    queryFn: async (): Promise<BatchData[]> => {
      const response = await apiClient.get(`/batches/${batchId}/data`);
      return response.data;
    },
    enabled: enabled && Boolean(batchId),
    refetchInterval,
  });

  useEffect(() => {
    if (batch && batchMetrics) {
      setPercentageComplete(
        calculateTotalCompletionPercentage(batch, batchMetrics)
      );
    }
  }, [batch, batchMetrics]);

  return {
    batchMetrics,
    isLoading,
    isError,
    error,
    percentageComplete,
  };
}
