import maplibregl from 'maplibre-gl';
import { useEffect, useRef } from 'react';
import type { PropsWithChildren } from 'react';

import { useMap } from '@/hooks/use-map';

import useMapStore from '@/stores/map';

import 'maplibre-gl/dist/maplibre-gl.css';

export const MapContainer = ({ children }: PropsWithChildren) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const { zoom, mapInstance } = useMap();
  const {
    mapInstance: mapInstanceFromStore,
    setMapInstance: setMapInstanceFromStore,
  } = useMapStore();

  useEffect(() => {
    if (mapContainerRef.current && !mapInstance) {
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: {
          version: 8,
          sources: {
            'osm-tiles': {
              type: 'raster',
              tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              minzoom: 0,
              maxzoom: 19,
              attribution: '© OpenStreetMap contributors',
            },
            'carto-tiles': {
              type: 'raster',
              tiles: [
                'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
              ],
              tileSize: 256,
              minzoom: 0,
              maxzoom: 19,
              attribution: '© Carto contributors',
            },
            'googlemaps-tiles': {
              type: 'raster',
              tiles: [
                'https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}',
              ],
              tileSize: 256,
              minzoom: 0,
              maxzoom: 19,
              attribution: '© Google contributors',
            },
          },
          layers: [
            {
              id: 'osm-tiles',
              type: 'raster',
              source: 'osm-tiles',
            },
          ],
        },
        center: [106.6873555, 10.7634781],
        zoom,
        fadeDuration: 0,
      });

      setMapInstanceFromStore(map);
    }

    return () => {
      if (mapInstanceFromStore) {
        mapInstanceFromStore.remove();
        setMapInstanceFromStore(null);
      }
    };
  }, []);

  return (
    <div id="map-container" className="relative h-screen w-full">
      <div ref={mapContainerRef} className="size-full" />
      {children}
    </div>
  );
};
