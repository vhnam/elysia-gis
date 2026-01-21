import maplibregl from 'maplibre-gl';
import { type PropsWithChildren, useEffect, useRef } from 'react';

import { Config } from '@/config/env';

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
              id: 'carto-tiles',
              type: 'raster',
              source: 'carto-tiles',
            },
          ],
        },
        center: [106.6873555, 10.7634781],
        zoom,
        fadeDuration: 0,
      });

      map.on('load', () => {
        map.addSource('elysia-administrative-unit-provinces-tiles', {
          type: 'vector',
          tiles: [
            `${Config.MAP_TILES_URL}/vt.administrative_unit_provinces/{z}/{x}/{y}.pbf`,
          ],
          minzoom: 0,
          maxzoom: 19,
          bounds: [102.143914, 6.931062, 117.393262, 23.392643],
        });

        map.addLayer({
          id: 'elysia-administrative-unit-provinces-tiles',
          source: 'elysia-administrative-unit-provinces-tiles',
          'source-layer': 'vt.administrative_unit_provinces',
          type: 'fill',
          paint: {
            'fill-color': '#34a85a',
            'fill-opacity': 0.3,
            'fill-outline-color': '#000',
          },
        });
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
