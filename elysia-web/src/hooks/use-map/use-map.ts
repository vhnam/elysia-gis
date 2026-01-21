import { useCallback, useEffect, useState } from 'react';

import { useGeolocation } from '@/hooks/use-geolocation';

import useMapStore from '@/stores/map';

export const useMap = () => {
  const { zoom, mapInstance, setZoom } = useMapStore();
  const { getCurrentLocation } = useGeolocation();
  const [center, setCenter] = useState({ latitude: 0, longitude: 0 });

  // Update center when map moves
  useEffect(() => {
    if (!mapInstance) {
      return;
    }

    const updateCenter = () => {
      const mapCenter = mapInstance.getCenter();
      setCenter({
        latitude: mapCenter.lat,
        longitude: mapCenter.lng,
      });
    };

    // Set initial center
    updateCenter();

    // Listen to map move events
    mapInstance.on('move', updateCenter);
    mapInstance.on('moveend', updateCenter);

    return () => {
      mapInstance.off('move', updateCenter);
      mapInstance.off('moveend', updateCenter);
    };
  }, [mapInstance]);

  const handleCurrentLocation = useCallback(async () => {
    if (!mapInstance) {
      return;
    }

    try {
      const { longitude, latitude } = await getCurrentLocation();
      mapInstance.flyTo({
        center: [longitude, latitude],
        zoom: 14,
      });
    } catch (error) {
      // Error is already logged by useGeolocation hook
      // Silently fail - user can try again
      if (import.meta.env.DEV) {
        console.error('Error getting current location:', error);
      }
    }
  }, [mapInstance, getCurrentLocation]);

  const handleZoomIn = useCallback(() => {
    if (mapInstance && zoom < 20) {
      const zoomLevel = zoom + 1;
      setZoom(zoomLevel);
      mapInstance.zoomTo(zoomLevel);
    }
  }, [mapInstance, zoom, setZoom]);

  const handleZoomOut = useCallback(() => {
    if (mapInstance && zoom > 0) {
      const zoomLevel = zoom - 1;
      setZoom(zoomLevel);
      mapInstance.zoomTo(zoomLevel);
    }
  }, [mapInstance, zoom, setZoom]);

  const handleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      return;
    }

    // Use map instance container if available, otherwise fallback to getElementById
    const mapContainer =
      mapInstance?.getContainer() || document.getElementById('map-container');

    if (mapContainer) {
      mapContainer.requestFullscreen().catch((error) => {
        // Fullscreen API errors are usually due to user interaction requirements
        // Silently fail - user can try again
        if (import.meta.env.DEV) {
          console.error('Error attempting to enable fullscreen:', error);
        }
      });
    }
  }, [mapInstance]);

  return {
    center,
    mapInstance,
    zoom,
    onFullscreen: handleFullscreen,
    onCurrentLocation: handleCurrentLocation,
    onZoomIn: handleZoomIn,
    onZoomOut: handleZoomOut,
  };
};
