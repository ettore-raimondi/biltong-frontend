import z from "zod";

export const batchDataSchema = z.object({
  id: z.number(),
  batchId: z.number(),
  timeStamp: z.date(),
  temperature: z.number(),
  airFlow: z.number().int(),
  humidity: z.number(),
  weightMeasurements: z
    .array(
      z.object({
        id: z.number(),
        weight: z.number(),
        batchDataId: z.number(),
        meatPieceId: z.number(),
        meatPiece: z
          .object({
            id: z.number(),
            pieceNumber: z.number().int(),
            initialWeight: z.number(),
            batchId: z.number(),
          })
          .optional(),
      })
    )
    .optional(),
});

export type BatchData = z.infer<typeof batchDataSchema>;
