import {
  IconMapPinFilled,
  IconMapPinSearch,
  IconMinus,
  IconPlus,
} from '@tabler/icons-react';
import maplibregl, { type Map, Marker } from 'maplibre-gl';
import { useEffect, useRef } from 'react';

import { cn } from '@/utils/ui';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';

interface MapReviewProps {
  latitude: number;
  longitude: number;
  isEditMode: boolean;
  setIsEditMode: (isEditMode: boolean) => void;
  onDragEnd?: (latitude: number, longitude: number) => void;
}

export const MapReview = ({
  latitude,
  longitude,
  isEditMode,
  setIsEditMode,
  onDragEnd,
}: MapReviewProps) => {
  const mapReviewRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map>(null);
  const markerRef = useRef<Marker>(null);

  useEffect(() => {
    if (mapReviewRef.current && !mapInstanceRef.current) {
      const map = new maplibregl.Map({
        container: mapReviewRef.current,
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
        center: {
          lng: longitude,
          lat: latitude,
        },
        zoom: 15,
        attributionControl: false,
      });

      if (isEditMode) {
        map.on('dragend', (event) => {
          const { lng, lat } = event.target.getCenter();
          onDragEnd?.(lat, lng);
        });
      } else {
        map.dragPan.disable();
        map.touchZoomRotate.disable();
        map.doubleClickZoom.disable();
        map.scrollZoom.disable();
        map.dragRotate.disable();
        map.dragRotate.disable();

        markerRef.current = new maplibregl.Marker({
          color: '#ef4444',
        })
          .setLngLat({
            lat: latitude,
            lng: longitude,
          })
          .addTo(map);
      }

      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current?.setCenter({
        lng: longitude,
        lat: latitude,
      });
      markerRef.current?.setLngLat({
        lng: longitude,
        lat: latitude,
      });
    }
  }, [latitude, longitude]);

  const handleZoomIn = () => {
    const currentZoom = mapInstanceRef.current?.getZoom() ?? 0;
    if (mapInstanceRef.current && currentZoom < 20) {
      mapInstanceRef.current.zoomTo(currentZoom + 1);
    }
  };

  const handleZoomOut = () => {
    const currentZoom = mapInstanceRef.current?.getZoom() ?? 0;
    if (mapInstanceRef.current && currentZoom > 0) {
      mapInstanceRef.current.zoomTo(currentZoom - 1);
    }
  };

  return (
    <div
      className="relative ![&_.maplibregl-interactive]:cursor-default"
      role="application"
      aria-label="Map review"
    >
      <div
        ref={mapReviewRef}
        className={cn('w-full border border-input rounded-md', {
          'h-36': !isEditMode,
          'h-96 mb-12': isEditMode,
        })}
      />
      {isEditMode ? (
        <>
          <div className="absolute top-[calc(50%-16px)] left-[calc(50%-16px)] flex items-center justify-center">
            <IconMapPinFilled
              className="text-red-500"
              size={32}
              aria-hidden="true"
            />
          </div>
          <ButtonGroup
            orientation="vertical"
            className="absolute bottom-4 right-4"
          >
            <Button
              variant="outline"
              size="icon-sm"
              onClick={handleZoomIn}
              aria-label="Zoom in"
            >
              <IconPlus />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={handleZoomOut}
              aria-label="Zoom out"
            >
              <IconMinus />
            </Button>
          </ButtonGroup>
        </>
      ) : (
        <Button
          variant="outline"
          type="button"
          className="absolute bottom-2 left-2"
          onClick={() => setIsEditMode(true)}
          aria-label="Edit map location"
        >
          <IconMapPinSearch size={16} />
          Edit map location
        </Button>
      )}
    </div>
  );
};
