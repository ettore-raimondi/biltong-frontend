import { useNavigate } from "react-router-dom";
import BatchCard from "./BatchCard";
import { DashboardContext } from "../context/DashboardContext";
import { useContext } from "react";

function HomeContent() {
  const navigate = useNavigate();
  const context = useContext(DashboardContext);
  if (!context) return <div>Error: context not found</div>;
  const { batches, activeBatch } = context;
  return (
    <>
      <p>Running batch</p>
      <div className="flex-grid">
        {activeBatch && (
          <BatchCard
            key={activeBatch.id}
            batch={activeBatch}
            progressValue={25}
            onClick={() => navigate("active-batch")}
          />
        )}
      </div>

      <p>All Batches</p>
      <div className="flex-grid">
        {(batches ?? []).map((batch) => (
          <BatchCard
            key={batch.id}
            batch={batch}
            progressValue={100}
            onClick={() => console.log("Clicked on batch:", batch.id)}
          />
        ))}
      </div>
    </>
  );
}

export default HomeContent;
