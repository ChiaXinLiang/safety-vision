import { z } from "zod";

export const ModelCategorySchema = z.enum([
  "safety helmet",
  "safety shoe",
  "reflective vest",
  "crane",
  "working platform",
  "step ladder",
  "fire",
  "smoke",
]);

export const ModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  version: z.string(),
  description: z.string(),
  categories: z.array(ModelCategorySchema),
  createdAt: z.date(),
  updatedAt: z.date(),
  status: z.enum(["active", "training", "inactive"]),
});

export type ModelCategory = z.infer<typeof ModelCategorySchema>
export type AIModel = z.infer<typeof ModelSchema>