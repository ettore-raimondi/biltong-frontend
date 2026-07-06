import { useNavigate } from "react-router-dom";
import { DashboardContext } from "../context/DashboardContext";
import { useContext } from "react";
import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/api-service";
import { useToast } from "../context/Toast";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { useBatchMetrics } from "../hooks/useBatchMetrics";

function HomeContent() {
  const navigate = useNavigate();
  const toast = useToast();
  const context = useContext(DashboardContext);
  const deactivateBatchMutation = useMutation({
    mutationFn: deactivateBatch,
  });
  const deleteBatchMutation = useMutation({
    mutationFn: deleteBatch,
  });

  if (!context) {
    return <>Loading...</>;
  }
  const { batches, activeBatch, refetchBatches, setShowCreateBatchDialog } =
    context;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { percentageComplete } = useBatchMetrics(
    activeBatch?.id,
    activeBatch ?? undefined,
    {
      enabled: Boolean(activeBatch?.id),
      refetchInterval: 2000,
    },
  );

  function getTitle({ name, isLoading }: { name: string; isLoading: boolean }) {
    return (
      <div className="flex align-items-center gap-2">
        <span>{name}</span>
        {isLoading && (
          <ProgressSpinner
            style={{ width: "2rem", height: "2rem", marginRight: "0px" }}
          />
        )}
      </div>
    );
  }

  const confirmDeactivate = (event: React.MouseEvent<HTMLButtonElement>) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Do you want to deactivate this record?",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: () => deactivateBatchMutation.mutate(),
      reject: () => {},
    });
  };

  const confirmDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Do you want to delete this record?",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: () => deleteBatchMutation.mutate({ id }),
      reject: () => {},
    });
  };

  async function deleteBatch({ id }: { id: number }) {
    try {
      await apiClient.post("/batches/delete", { id });
      refetchBatches();
      toast.show("success", "Batch deleted successfully!");
    } catch (error) {
      console.error("Failed to delete batch:", error);
    }
  }

  async function deactivateBatch() {
    try {
      await apiClient.post("/batches/deactivate", { id: activeBatch?.id });
      refetchBatches();
      toast.show("success", "Batch deactivated successfully!");
    } catch (error) {
      console.error("Failed to deactivate batch:", error);
    }
  }

  return (
    <>
      <div>
        <ConfirmPopup />
        {!activeBatch ? (
          <Card className="m-5 p-5 text-center">
            <h2>No Batches Running</h2>
            <p>Please create a new batch to get started.</p>
            <Button
              label="Create Batch"
              onClick={() => setShowCreateBatchDialog(true)}
            />
          </Card>
        ) : (
          <>
            <p>Running batch</p>
            <div className="flex-grid m-5">
              {activeBatch && (
                <Card
                  className="item batch-card"
                  footer={
                    <div className="flex gap-2">
                      <Button
                        label="View"
                        onClick={() => navigate(`view-batch/${activeBatch.id}`)}
                        size="small"
                        icon="pi pi-eye"
                      />
                      <Button
                        label="Stop"
                        size="small"
                        severity="danger"
                        icon="pi pi-times"
                        onClick={(event) => confirmDeactivate(event)}
                      />
                    </div>
                  }
                  title={getTitle({
                    name: activeBatch.name,
                    isLoading: percentageComplete !== 100,
                  })}
                  key={activeBatch.id}
                >
                  <div className="flex flex-column gap-4">
                    <p className="m-0">Click me to edit</p>
                    <ProgressBar
                      value={percentageComplete ?? 0}
                      style={{ height: "1rem" }}
                    ></ProgressBar>
                  </div>
                </Card>
              )}
            </div>
          </>
        )}

        {!batches.length ? (
          <div className="m-5 p-5 text-center">
            <h2>No Past Batches</h2>
            <p>You have no past batches. Create a new batch to get started.</p>
            <p>Once you finish or stop a batch, it will appear here.</p>
          </div>
        ) : (
          <>
            <p>Batch history</p>
            <div className="flex-grid m-5">
              {batches.map((batch) => (
                <Card
                  className="item batch-card"
                  footer={
                    <div className="flex gap-2">
                      <Button
                        label="View"
                        onClick={() => navigate(`view-batch/${batch.id}`)}
                        size="small"
                        icon="pi pi-eye"
                      />
                      <Button
                        label="Delete"
                        size="small"
                        severity="danger"
                        icon="pi pi-times"
                        onClick={(event) => confirmDelete(event, batch.id)}
                      />
                    </div>
                  }
                  title={batch.name}
                  key={batch.id}
                >
                  <div className="flex flex-column gap-4">
                    <p className="m-0">Click me to edit</p>
                    <ProgressBar
                      value={100}
                      style={{ height: "1rem" }}
                    ></ProgressBar>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default HomeContent;
