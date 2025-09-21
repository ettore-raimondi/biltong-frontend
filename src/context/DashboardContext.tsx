import { createContext } from "react";
import type { Batch } from "../schemas/batch-schemas";
type DashboardContextType = {
  batches: Batch[];
  activeBatch: Batch | null;
  refetchBatches: () => void;
};
export const DashboardContext = createContext<DashboardContextType | null>(
  null
);
