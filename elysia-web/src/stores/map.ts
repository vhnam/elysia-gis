import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Map } from 'maplibre-gl';

type MapState = {
  zoom: number;
  mapInstance: Map | null;
};

type MapActions = {
  setZoom: (zoom: number) => void;
  setMapInstance: (map: Map | null) => void;
};

export type MapStore = MapState & MapActions;

const initialState: MapState = {
  zoom: 14,
  mapInstance: null,
};

const useMapStore = create<MapStore>()(
  persist(
    (set) => ({
      ...initialState,
      setZoom: (zoom: number) => set({ zoom }),
      setMapInstance: (map: Map | null) => set({ mapInstance: map }),
    }),
    {
      name: 'map-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ zoom: state.zoom }), // Only persist zoom, not map instance
    },
  ),
);

export default useMapStore;
