import { z } from "zod";

export const AlertTypeSchema = z.enum(["safety", "dangerous"]);
export const AlertStatusSchema = z.enum(["active", "resolved", "pending"]);
export const AlertPrioritySchema = z.enum(["low", "medium", "high", "critical"]);

export const AlertSchema = z.object({
  id: z.string(),
  type: AlertTypeSchema,
  title: z.string(),
  message: z.string(),
  location: z.string(),
  timestamp: z.date(),
  status: AlertStatusSchema,
  priority: AlertPrioritySchema.optional(),
  assignedTo: z.string().optional(),
  resolvedAt: z.date().optional(),
  resolvedBy: z.string().optional(),
});

export type AlertType = z.infer<typeof AlertTypeSchema>
export type AlertStatus = z.infer<typeof AlertStatusSchema>
export type AlertPriority = z.infer<typeof AlertPrioritySchema>
export type Alert = z.infer<typeof AlertSchema>