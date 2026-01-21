export const useGeolocation = () => {
  const getCurrentLocation = (): Promise<{
    longitude: number;
    latitude: number;
  }> => {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
        },
        (error) => {
          // Log in dev mode only - error is passed to caller for handling
          if (import.meta.env.DEV) {
            console.error('Error getting current location:', error);
          }
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    });
  };

  return { getCurrentLocation };
};
