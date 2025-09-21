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

  if (!context) return <div>Error: context not found</div>;
  const { batches, activeBatch, refetchBatches } = context;

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
    id: number
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
      <p>Running batch</p>
      <div className="flex-grid">
        <ConfirmPopup />
        {activeBatch && (
          <Card
            className="item batch-card"
            footer={
              <div className="flex gap-2">
                <Button
                  label="View"
                  onClick={() => navigate("active-batch")}
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
            title={getTitle({ name: activeBatch.name, isLoading: true })}
            key={activeBatch.id}
          >
            <div className="flex flex-column gap-4">
              <p className="m-0">Click me to edit</p>
              <ProgressBar value={25} style={{ height: "1rem" }}></ProgressBar>
            </div>
          </Card>
        )}
      </div>

      <p>All Batches</p>
      <div className="flex-grid">
        {(batches ?? []).map((batch) => (
          <Card
            className="item batch-card"
            footer={
              <div className="flex gap-2">
                <Button
                  label="View"
                  onClick={() => navigate("active-batch")}
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
              <ProgressBar value={100} style={{ height: "1rem" }}></ProgressBar>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export default HomeContent;
