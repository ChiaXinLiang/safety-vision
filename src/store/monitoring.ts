"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { MOCK_AREAS } from "@/lib/constants/monitoring"
import type { Area } from "@/lib/types/monitoring"

interface MonitoringState {
  areas: Area[]
  selectedAreaIds: string[]
  toggleAreaSelection: (id: string) => void
  toggleAllAreas: () => void
  selectedAreas: Area[]
  isAllAreasSelected: boolean
  setSelectedAreaIds: (ids: string[]) => void
  addArea: (name: string, description: string) => void
  updateArea: (id: string, updates: Partial<Area>) => void
  deleteArea: (id: string) => void
}

export const useMonitoringStore = create<MonitoringState>()(
  persist(
    (set, get) => ({
      areas: MOCK_AREAS,
      selectedAreaIds: MOCK_AREAS.map(area => area.id),
      toggleAreaSelection: (id) => {
        set((state) => {
          const isSelected = state.selectedAreaIds.includes(id)
          return {
            selectedAreaIds: isSelected
              ? state.selectedAreaIds.filter((areaId) => areaId !== id)
              : [...state.selectedAreaIds, id]
          }
        })
      },
      toggleAllAreas: () => {
        set((state) => ({
          selectedAreaIds: state.isAllAreasSelected ? [] : state.areas.map(area => area.id)
        }))
      },
      setSelectedAreaIds: (ids) => {
        set({ selectedAreaIds: ids })
      },
      addArea: (name, description) => {
        set((state) => ({
          areas: [
            ...state.areas,
            {
              id: `area${state.areas.length + 1}`,
              name,
              description,
              locations: []
            }
          ]
        }))
      },
      updateArea: (id, updates) => {
        set((state) => ({
          areas: state.areas.map((area) =>
            area.id === id ? { ...area, ...updates } : area
          )
        }))
      },
      deleteArea: (id) => {
        set((state) => ({
          areas: state.areas.filter((area) => area.id !== id),
          selectedAreaIds: state.selectedAreaIds.filter((areaId) => areaId !== id)
        }))
      },
      get selectedAreas() {
        const state = get()
        return state.areas.filter((area) => 
          state.selectedAreaIds.includes(area.id)
        )
      },
      get isAllAreasSelected() {
        const state = get()
        return state.areas.length > 0 && state.selectedAreaIds.length === state.areas.length
      },
    }),
    {
      name: "monitoring-storage",
      version: 1,
      skipHydration: true,
    }
  )
)