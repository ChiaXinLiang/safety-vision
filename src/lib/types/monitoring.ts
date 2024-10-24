import { z } from "zod"

export const CameraSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["main", "sub"]),
  lastIncident: z.string(),
})

export const LocationSchema = z.object({
  id: z.string(),
  name: z.string(),
  cameras: z.array(CameraSchema),
})

export const AreaSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  locations: z.array(LocationSchema),
})

export type Camera = z.infer<typeof CameraSchema>
export type Location = z.infer<typeof LocationSchema>
export type Area = z.infer<typeof AreaSchema>