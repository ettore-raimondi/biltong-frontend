import { useState } from "react";
import { CreateBatchDialog } from "../components/CreateBatchDialog";
import { Sidebar } from "../components/layout/Sidebar";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-service";
import type { Batch } from "../schemas/batch-schemas";
import { Outlet } from "react-router";
import { DashboardContext } from "../context/DashboardContext";
function Home() {
  const [showCreateBatchDialog, setShowCreateBatchDialog] = useState(false);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [activeBatch, setActiveBatch] = useState<Batch | null>(null);

  const { refetch: refetchBatches } = useQuery({
    queryKey: ["batches"],
    queryFn: async () => {
      const response = await apiClient.get("/batches");
      // Sets all batches
      setBatches(response.data.filter((batch: Batch) => batch.deletedAt));
      setActiveBatch(
        response.data.find((batch: Batch) => !batch.deletedAt) || null
      );
      return response.data;
    },
  });

  return (
    <div className="flex h-screen">
      <DashboardContext.Provider
        value={{ batches, activeBatch, refetchBatches }}
      >
        <Sidebar handleCreateBatch={() => setShowCreateBatchDialog(true)} />
        <CreateBatchDialog
          visible={showCreateBatchDialog}
          onBatchCreated={() => {
            setShowCreateBatchDialog(false);
            refetchBatches();
          }}
          onHide={() => setShowCreateBatchDialog(false)}
        />
        <div className="h-full w-full mx-3">
          {/** Main content area */}
          <Outlet />
        </div>
      </DashboardContext.Provider>
    </div>
  );
}

export default Home;
