import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";
import type { Batch } from "../schemas/batch-schemas";

function BatchCard({
  batch,
  progressValue,
  onClick,
}: {
  batch: Batch;
  progressValue: number;
  onClick?: () => void;
}) {
  return (
    <Card className="item batch-card" title={batch.name} onClick={onClick}>
      <div className="flex flex-column gap-4">
        <p className="m-0">Click me to edit</p>
        <ProgressBar
          value={progressValue}
          style={{ height: "1rem" }}
        ></ProgressBar>
      </div>
    </Card>
  );
}

export default BatchCard;
