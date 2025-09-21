import z from "zod";

export const meatPieceSchema = z.object({
  id: z.number(),
  pieceNumber: z.number().min(1),
  initialWeight: z.number().min(0),
  batchId: z.number(),
});
export const createMeatPieceSchema = meatPieceSchema.omit({
  id: true,
  batchId: true,
});

export const batchSchema = z.object({
  id: z.number(),
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  deletedAt: z.date().optional(),
  marinadeTime: z.string().optional(),
  seasoning: z.string().max(200).optional(),
  temperature: z.number().min(0),
  humidity: z.number().min(0),
  weightLoss: z.number().min(0),
  airFlow: z.number().min(0),
  meatPieces: z.array(meatPieceSchema),
});
export const createBatchSchema = batchSchema
  .omit({ id: true, createdAt: true, updatedAt: true, deletedAt: true })
  .extend({
    meatPieces: z.array(createMeatPieceSchema),
  });

export type Batch = z.infer<typeof batchSchema>;

export type CreateBatchInput = z.infer<typeof createBatchSchema>;

export const DryingProfile = {
  WET: "WET",
  MEDIUM: "MEDIUM",
  DRY: "DRY",
} as const;

export type DryingProfile = (typeof DryingProfile)[keyof typeof DryingProfile];
