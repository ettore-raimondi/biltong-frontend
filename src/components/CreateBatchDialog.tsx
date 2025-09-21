import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import {
  createBatchSchema,
  type Batch,
  type CreateBatchInput,
} from "../schemas/batch-schemas";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/api-service";
import { useToast } from "../context/Toast";
import { InputSwitch } from "primereact/inputswitch";
import { Card } from "primereact/card";
import {
  DRYING_PROFILES,
  type DryingProfileConfig,
} from "../config/drying-profiles";

export function CreateBatchDialog({
  visible,
  onHide,
  onBatchCreated,
}: {
  visible: boolean;
  onHide: () => void;
  onBatchCreated: (batch: Batch) => void;
}) {
  const toast = useToast();
  const createBatchMutation = useMutation({
    mutationFn: handleCreateBatch,
  });

  const [weight, setWeight] = useState<(number | null)[]>(
    Array.from({ length: 9 }, () => 0)
  );
  const [humidity, setHumidity] = useState<number | null>(0);
  const [temperature, setTemperature] = useState<number | null>(0);
  const [weightLoss, setWeightLoss] = useState<number | null>(0);
  const [airflow, setAirflow] = useState<number | null>(0);
  const [name, setName] = useState<string>("");
  const [marinadeTime, setMarinadeTime] = useState<string>("");
  const [seasoning, setSeasoning] = useState<string>("");
  const [customDryingParams, setCustomDryingParams] = useState<boolean>(false);
  const [selectedProfile, setSelectedProfile] =
    useState<DryingProfileConfig | null>(null);

  function setWeightAtIndex(index: number, value: number | null) {
    setWeight((prev) => {
      const newWeights = [...prev];
      newWeights[index] = value;
      return newWeights;
    });
  }

  async function handleCreateBatch() {
    try {
      // Create the input model & validate it
      const batch: CreateBatchInput = {
        name,
        marinadeTime,
        seasoning,
        temperature: temperature ?? 0,
        humidity: humidity ?? 0,
        weightLoss: weightLoss ?? 0,
        airFlow: airflow ?? 0,
        meatPieces: weight.map((w, i) => ({
          pieceNumber: i + 1,
          initialWeight: w ?? 0,
        })),
      };
      const validationResult = createBatchSchema.safeParse(batch);
      if (!validationResult.success) {
        toast.show("error", validationResult.error.message);
        return;
      }

      // Data is valid, we can send it to API
      const result = await apiClient.post<Batch>("/batches", batch);
      onBatchCreated(result.data);
      toast.show("success", "Batch created successfully!");
    } catch (error) {
      toast.show("error", `Failed to create batch. ${error}`);
    }
  }

  function handleSelectProfile(profile: DryingProfileConfig) {
    // Set the drying parameters based on the selected profile
    setTemperature(profile.temperature);
    setHumidity(profile.humidity);
    setAirflow(profile.airflow);
    setWeightLoss(profile.targetWeightLoss);
    setSelectedProfile(profile);
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
        onClick={() => createBatchMutation.mutate()}
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
          <Divider className="mt-0" align="center">
            <span className="p-tag">Information</span>
          </Divider>
          <div className="card flex flex-wrap gap-3 p-fluid">
            <div className="flex flex-column gap-2">
              <label htmlFor="batch-name">Batch name</label>
              <InputText
                id="batch-name"
                aria-describedby="batch-name-help"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <small id="batch-name-help">
                Enter a name for your batch. Get creative
              </small>
            </div>
            <div className="flex flex-column gap-2">
              <label htmlFor="batch-name">Marinade time</label>
              <InputText
                id="marinade-time"
                aria-describedby="marinade-time-help"
                value={marinadeTime}
                onChange={(e) => setMarinadeTime(e.target.value)}
              />
              <small id="marinade-time-help">
                How long was it marinaded for?
              </small>
            </div>
            <div className="flex flex-column gap-2">
              <label htmlFor="batch-name">Seasoning</label>
              <InputText
                id="seasoning"
                aria-describedby="seasoning-help"
                value={seasoning}
                onChange={(e) => setSeasoning(e.target.value)}
              />
              <small id="seasoning-help">What seasoning did you use?</small>
            </div>
          </div>
          <Divider align="center">
            <span className="p-tag">Drying paramaters</span>
          </Divider>
          <div className="flex align-items-center mb-4">
            <InputSwitch
              checked={customDryingParams}
              onChange={(e) => setCustomDryingParams(e.value)}
            />
            <span className="ml-2">Set custom drying parameters</span>
          </div>
          {!customDryingParams && (
            <div className="flex flex-wrap gap-3 p-fluid">
              {DRYING_PROFILES.map((profile) => (
                <Card
                  title={profile.name}
                  subTitle={profile.subtitle}
                  className={`profile-card w-full ${
                    selectedProfile?.id === profile.id ? "selected" : ""
                  }`}
                  onClick={() => handleSelectProfile(profile)}
                >
                  <p className="m-0">
                    <b>Character:</b> {profile.characteristics}
                  </p>
                  <p className="m-0 mt-2">
                    <b>Details:</b> {profile.details}
                  </p>
                  <p className="m-0 mt-2">
                    <b>Temperature:</b> {profile.temperature}℃
                  </p>
                  <p className="m-0 mt-2">
                    <b>Humidity:</b> {profile.humidity}%
                  </p>
                  <p className="m-0 mt-2">
                    <b>Air flow:</b> {profile.airflow} m/s
                  </p>
                  <p className="m-0 mt-2">
                    <b>Target weight loss:</b> {profile.targetWeightLoss}%
                  </p>
                </Card>
              ))}
            </div>
          )}
          {customDryingParams && (
            <div className="card flex flex-wrap gap-3 p-fluid">
              <div className="flex flex-column gap-2">
                <label htmlFor="temperature">Temperature (C)</label>
                <InputNumber
                  value={temperature}
                  onValueChange={(e) => setTemperature(e.value ?? null)}
                  prefix="&uarr; "
                  suffix="℃"
                  min={0}
                  max={40}
                />
                <small id="temperature-help">Temperature to keep</small>
              </div>
              <div className="flex flex-column gap-2">
                <label htmlFor="air-flow">Air flow (m/s)</label>
                <InputNumber
                  value={airflow ?? 0}
                  max={1}
                  onValueChange={(e) => setAirflow(e.value ?? null)}
                  suffix=" m/s"
                />
                <small id="air-flow-help">Number between 0.1 and 1</small>
              </div>
              <div className="flex flex-column gap-2">
                <label htmlFor="moisture">Humidity (%)</label>
                <InputNumber
                  value={humidity ?? 0}
                  max={100}
                  onValueChange={(e) => setHumidity(e.value ?? null)}
                  suffix="%"
                />
                <small id="moisture-help">high = mold, low = hard crust</small>
              </div>
            </div>
          )}
          <Divider align="center">
            <span className="p-tag">Meat weight</span>
          </Divider>
          <p className="mt-5">
            Enter the weight of each hook in grams. You can enter up to 9. Hook
            1 being top left hook, hook 2 top middle, hook 3 top right and etc.
            This will automatically be set when the weight sensors are
            connected.
          </p>
          <div className="card flex flex-wrap gap-3 p-fluid">
            {weight.map((w, i) => (
              <div className="flex-3" key={i}>
                <label htmlFor={`hook-${i}`} className="font-bold block mb-2">
                  Hook {i + 1}
                </label>
                <InputNumber
                  inputId={`hook-${i}`}
                  value={w}
                  suffix=" g"
                  onValueChange={(e) => setWeightAtIndex(i, e.value ?? null)}
                />
              </div>
            ))}
          </div>
          {customDryingParams && (
            <>
              <Divider align="center">
                <span className="p-tag">Weight loss target</span>
              </Divider>
              <p className="mt-5">
                The box will dry your biltong until it reaches the target
                weight. Meat contains about 75% water.
                <ul>
                  <li>~40% loss = wet biltong,</li>
                  <li>~45–50% loss = classic biltong,</li>
                  <li>~55–60% loss = very dry biltong</li>
                  <li>~65%+ loss = biltong for long term storage</li>
                </ul>
              </p>
              <div className="card flex flex-column md:flex-row gap-3">
                <div className="flex flex-column gap-2 mt-2">
                  <label htmlFor="weight-loss">Weight loss %</label>
                  <InputNumber
                    value={weightLoss ?? 0}
                    max={75}
                    onValueChange={(e) => setWeightLoss(e.value ?? null)}
                    suffix="%"
                  />
                  <small id="weight-loss-help">
                    Target weight loss percentage
                  </small>
                </div>
              </div>
            </>
          )}
        </div>
      </Dialog>
    </div>
  );
}
