import { useCallback, useMemo } from 'react';

import { useGeolocation } from '@/hooks/use-geolocation';

import useMapStore from '@/stores/map';

export const useMap = () => {
  const { zoom, mapInstance, setZoom } = useMapStore();
  const { getCurrentLocation } = useGeolocation();

  const center = useMemo(() => {
    return {
      latitude: mapInstance?.getCenter().lat ?? 0,
      longitude: mapInstance?.getCenter().lng ?? 0,
    };
  }, [mapInstance?.getCenter]);

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
      console.error('Error getting current location:', error);
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
        console.error('Error attempting to enable fullscreen:', error);
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
