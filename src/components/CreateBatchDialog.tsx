import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export function CreateBatchDialog({
  visible,
  onHide,
}: {
  visible: boolean;
  onHide: () => void;
}) {
  const [weight, setWeight] = useState<(number | null)[]>(
    Array.from({ length: 9 }, () => 0)
  );

  function setWeightAtIndex(index: number, value: number | null) {
    setWeight((prev) => {
      const newWeights = [...prev];
      newWeights[index] = value;
      return newWeights;
    });
  }

  if (!visible) return null;
  const footerContent = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => onHide()}
        className="p-button-text"
      />
      <Button
        label="Create"
        icon="pi pi-check"
        onClick={() => onHide()}
        autoFocus
      />
    </div>
  );

  return (
    <div className="card flex justify-content-center">
      <Dialog
        header="Create Batch"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          onHide();
        }}
        footer={footerContent}
      >
        <div>
          <div className="card flex flex-wrap gap-3 p-fluid mt-5">
            <div className="flex flex-column gap-2">
              <label htmlFor="batch-name">Batch name</label>
              <InputText id="batch-name" aria-describedby="batch-name-help" />
              <small id="batch-name-help">
                Enter a name for your batch. Get creative
              </small>
            </div>
            <div className="flex flex-column gap-2">
              <label htmlFor="batch-name">Marinade time</label>
              <InputText
                id="marinade-time"
                aria-describedby="marinade-time-help"
              />
              <small id="marinade-time-help">
                How long was it marinaded for?
              </small>
            </div>
            <div className="flex flex-column gap-2">
              <label htmlFor="batch-name">Seasoning</label>
              <InputText id="seasoning" aria-describedby="seasoning-help" />
              <small id="seasoning-help">What seasoning did you use?</small>
            </div>
          </div>
          <Divider />
          <p className="mt-5">Set desired drying parameters for this batch.</p>
          <div className="card flex flex-wrap gap-3 p-fluid mt-5">
            <div className="flex flex-column gap-2">
              <label htmlFor="temperature">Temperature (C)</label>
              <InputText id="temperature" aria-describedby="temperature-help" />
              <small id="temperature-help">Temperature to keep</small>
            </div>
            <div className="flex flex-column gap-2">
              <label htmlFor="air-flow">Air flow (RPM)</label>
              <InputText id="air-flow" aria-describedby="air-flow-help" />
              <small id="air-flow-help">
                Enter the air flow for your batch.
              </small>
            </div>
            <div className="flex flex-column gap-2">
              <label htmlFor="moisture">Humidity (%)</label>
              <InputText id="moisture" aria-describedby="moisture-help" />
              <small id="moisture-help">high = mold, low = hard crust</small>
            </div>
          </div>
          <Divider />

          <p className="mt-5">
            Enter the weight of each hook in grams. You can enter up to 9. Hook
            1 being top left hook, hook 2 top middle, hook 3 top right and etc.
            This will automatically be set when the weight sensors are
            connected.
          </p>
          <div className="card flex flex-wrap gap-3 p-fluid mt-5">
            {weight.map((w, i) => (
              <div className="flex-3" key={i}>
                <label htmlFor={`hook-${i}`} className="font-bold block mb-2">
                  Hook {i + 1} (g)
                </label>
                <InputNumber
                  inputId={`hook-${i}`}
                  value={w}
                  onValueChange={(e) => setWeightAtIndex(i, e.value ?? null)}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-column gap-2 mt-5">
            <label htmlFor="weight-loss">Weight loss %</label>
            <InputText id="weight-loss" aria-describedby="weight-loss-help" />
            <small id="weight-loss-help">
              Percentage of weight loss you expect from each hook.
            </small>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
