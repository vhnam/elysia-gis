import { Map } from 'maplibre-gl';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type MapState = {
  mapInstance: Map | null;
  zoom: number;
};

type MapActions = {
  setMapInstance: (map: Map | null) => void;
  setZoom: (zoom: number) => void;
};

export type MapStore = MapState & MapActions;

const initialState: MapState = {
  zoom: 8,
  mapInstance: null,
};

const useMapStore = create<MapStore>()(
  persist(
    (set) => ({
      ...initialState,
      setMapInstance: (map: Map | null) => set({ mapInstance: map }),
      setZoom: (zoom: number) => set({ zoom }),
    }),
    {
      name: 'map-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ zoom: state.zoom }), // Only persist zoom, not map instance
    },
  ),
);

export default useMapStore;
