"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Area } from "../lib/types/area";
import { MOCK_AREAS } from "../lib/data/mock-db";
import type { Zone } from "../lib/types/zone";

interface MonitoringState {
  areas: Area[];
  selectedAreaIds: string[];
  selectedAreas: Area[];
  isAllAreasSelected: boolean;
  toggleAreaSelection: (id: string) => void;
  toggleAllAreas: () => void;
  setSelectedAreaIds: (ids: string[]) => void;
  addArea: (name: string, description: string) => void;
  updateArea: (id: string, updates: Partial<Area>) => void;
  deleteArea: (id: string) => void;
  addZone: (areaId: string, locationId: string, zone: Omit<Zone, "id">) => void;
  updateZone: (areaId: string, locationId: string, zoneId: string, updates: Partial<Zone>) => void;
  deleteZone: (areaId: string, locationId: string, zoneId: string) => void;
}

export const useMonitoringStore = create<MonitoringState>()(
  persist(
    (set, get) => ({
      areas: MOCK_AREAS,
      selectedAreaIds: MOCK_AREAS.map(area => area.id),
      selectedAreas: MOCK_AREAS,
      isAllAreasSelected: true,

      toggleAreaSelection: (id) => {
        set((state) => {
          const isSelected = state.selectedAreaIds.includes(id);
          const newSelectedAreaIds = isSelected
            ? state.selectedAreaIds.filter((areaId) => areaId !== id)
            : [...state.selectedAreaIds, id];

          return {
            selectedAreaIds: newSelectedAreaIds,
            selectedAreas: state.areas.filter(area => newSelectedAreaIds.includes(area.id)),
            isAllAreasSelected: newSelectedAreaIds.length === state.areas.length
          };
        });
      },

      toggleAllAreas: () => {
        set((state) => {
          const newSelectedAreaIds = state.isAllAreasSelected
            ? []
            : state.areas.map(area => area.id);

          return {
            selectedAreaIds: newSelectedAreaIds,
            selectedAreas: state.isAllAreasSelected ? [] : [...state.areas],
            isAllAreasSelected: !state.isAllAreasSelected
          };
        });
      },

      setSelectedAreaIds: (ids) => {
        set((state) => ({
          selectedAreaIds: ids,
          selectedAreas: state.areas.filter(area => ids.includes(area.id)),
          isAllAreasSelected: ids.length === state.areas.length
        }));
      },

      addArea: (name, description) => {
        set((state) => {
          const newArea = {
            id: `area${state.areas.length + 1}`,
            name,
            description,
            type: "factory" as const,
            locations: []
          };
          return {
            areas: [...state.areas, newArea],
          };
        });
      },

      updateArea: (id, updates) => {
        set((state) => ({
          areas: state.areas.map((area) =>
            area.id === id ? { ...area, ...updates } : area
          ),
        }));
      },

      deleteArea: (id) => {
        set((state) => ({
          areas: state.areas.filter((area) => area.id !== id),
          selectedAreaIds: state.selectedAreaIds.filter((areaId) => areaId !== id),
          selectedAreas: state.selectedAreas.filter(area => area.id !== id),
          isAllAreasSelected: false
        }));
      },

      addZone: (areaId, locationId, zone) => {
        set((state) => ({
          areas: state.areas.map((area) => {
            if (area.id !== areaId) return area;
            return {
              ...area,
              locations: area.locations.map((location) => {
                if (location.id !== locationId) return location;
                return {
                  ...location,
                  zones: [
                    ...location.zones,
                    {
                      id: `zone${location.zones.length + 1}`,
                      ...zone
                    }
                  ]
                };
              })
            };
          })
        }));
      },

      updateZone: (areaId, locationId, zoneId, updates) => {
        set((state) => ({
          areas: state.areas.map((area) => {
            if (area.id !== areaId) return area;
            return {
              ...area,
              locations: area.locations.map((location) => {
                if (location.id !== locationId) return location;
                return {
                  ...location,
                  zones: location.zones.map((zone) =>
                    zone.id === zoneId ? { ...zone, ...updates } : zone
                  )
                };
              })
            };
          })
        }));
      },

      deleteZone: (areaId, locationId, zoneId) => {
        set((state) => ({
          areas: state.areas.map((area) => {
            if (area.id !== areaId) return area;
            return {
              ...area,
              locations: area.locations.map((location) => {
                if (location.id !== locationId) return location;
                return {
                  ...location,
                  zones: location.zones.filter((zone) => zone.id !== zoneId)
                };
              })
            };
          })
        }));
      }
    }),
    {
      name: "monitoring-storage",
      version: 1,
      skipHydration: true,
    }
  )
);
