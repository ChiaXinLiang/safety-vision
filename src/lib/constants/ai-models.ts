import type { AIModel } from "@/lib/types/ai-model";

export const MOCK_MODELS: AIModel[] = [
  {
    id: "1",
    name: "Person Equipment",
    version: "v1",
    description: "Model for detecting personal protective equipment (PPE) including safety helmets, shoes, and vests.",
    categories: ["safety helmet", "safety shoe", "reflective vest"],
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 15),
    status: "active",
  },
  {
    id: "2",
    name: "Background",
    version: "v3",
    description: "Model for detecting construction site equipment and infrastructure.",
    categories: ["crane", "working platform", "step ladder"],
    createdAt: new Date(2023, 11, 1),
    updatedAt: new Date(2024, 0, 20),
    status: "active",
  },
  {
    id: "3",
    name: "Fire Smoke",
    version: "v2",
    description: "Model for detecting fire hazards and smoke in real-time.",
    categories: ["fire", "smoke"],
    createdAt: new Date(2023, 10, 15),
    updatedAt: new Date(2024, 0, 10),
    status: "training",
  },
];