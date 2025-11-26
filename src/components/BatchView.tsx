import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import type { Batch } from "../schemas/batch-schemas";
import apiClient from "../services/api-service";
import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import {
  getWeightLossOverTimeChartData,
  weightLossChartOptions,
} from "../graph-data/weight-loss-over-time";
import {
  getTempAndHumidityOverTime,
  tempHumidityChartSettings,
} from "../graph-data/temp-and-humidity";
import { Divider } from "primereact/divider";
import { Panel } from "primereact/panel";
import { useBatchMetrics } from "../hooks/useBatchMetrics";

function BatchView() {
  const { batchId } = useParams();
  const [weightLossOverTimeChartData, setWeightLossOverTimeChartData] =
    useState({});
  const [tempHumidityChartData, setTempHumidityChartData] = useState({});

  const { data: batch, isSuccess: batchSuccess } = useQuery({
    queryKey: ["batch", batchId],
    queryFn: async (): Promise<Batch> => {
      const response = await apiClient.get("/batches/" + batchId);
      return response.data;
    },
  });

  // Use the custom hook for batch metrics and completion percentage
  const { batchMetrics, percentageComplete } = useBatchMetrics(
    parseInt(batchId || ""),
    batch,
    {
      enabled: batchSuccess && Boolean(batch?.id),
      refetchInterval: 2000,
    }
  );

  useEffect(() => {
    setWeightLossOverTimeChartData(
      getWeightLossOverTimeChartData(batchMetrics || [])
    );
    setTempHumidityChartData(getTempAndHumidityOverTime(batchMetrics || []));
  }, [batchMetrics]);

  return (
    <>
      <Card className="m-5">
        <div className="flex flex-column gap-3 mb-3">
          <h1 className="mt-0">{batch?.name}</h1>
          <Panel
            style={{ background: "rgb(17, 24, 39)" }}
            header={"Batch Progress"}
          >
            <p>Target weight loss: {batch?.weightLoss}%</p>
            <progress
              value={percentageComplete ?? 0}
              max={100}
              style={{ width: "100%" }}
            ></progress>
            <div className="flex gap-5 mt-2 justify-content-end">
              <h3 className="mt-0 mb-0">{percentageComplete ?? 0}%</h3>
            </div>
          </Panel>
          <Panel header={"Batch Overview"}>
            <div className="flex flex-column gap-2">
              <div className="flex justify-content-between">
                <span>Batch ID</span>
                <span>{batch?.id}</span>
              </div>
              <Divider />
              <div className="flex justify-content-between">
                <span>Start Date</span>
                <span>
                  {batch
                    ? new Date(batch.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <Divider />
              <div className="flex justify-content-between">
                <span>Number of Meat Pieces</span>
                <span>{batch?.meatPieces.length}</span>
              </div>
              <Divider />
              <div className="flex justify-content-between">
                <span>Initial Total Weight</span>
                <span>
                  {batch
                    ? batch.meatPieces
                        .reduce(
                          (acc, piece) => acc + (piece.initialWeight || 0),
                          0
                        )
                        .toFixed(2) + " g"
                    : "N/A"}
                </span>
              </div>
            </div>
          </Panel>
          <Panel header={"Batch Targets"}>
            <div className="flex flex-column gap-2">
              <div className="flex justify-content-between">
                <span>Target Weight Loss</span>
                <span>{batch?.weightLoss}%</span>
              </div>
              <Divider />
              <div className="flex justify-content-between">
                <span>Target Humidity</span>
                <span>{batch?.humidity}%</span>
              </div>
              <Divider />
              <div className="flex justify-content-between">
                <span>Target Airflow</span>
                <span>{batch?.airFlow}M/S</span>
              </div>
              <Divider />
              <div className="flex justify-content-between">
                <span>Target Temperature</span>
                <span>{batch?.temperature}°C</span>
              </div>
            </div>
          </Panel>
          <Panel header={"Notes and other details"}>
            <p>Notes: {batch?.description || "No additional notes."}</p>
            <p>
              Marinade Time:{" "}
              {batch?.marinadeTime || "No marinade time details."}
            </p>
            <p>Seasoning: {batch?.seasoning || "No seasoning details."}</p>
          </Panel>
          <Panel header={"Weight Loss Over Time"}>
            <div>
              <Chart
                type="line"
                data={weightLossOverTimeChartData}
                options={weightLossChartOptions}
              />
            </div>
          </Panel>
          <Panel header={"Temperature and Humidity Over Time"}>
            <Chart
              type="line"
              data={tempHumidityChartData}
              options={tempHumidityChartSettings}
            />
          </Panel>
        </div>
      </Card>
    </>
  );
}

export default BatchView;
