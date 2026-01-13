import { MapContainer, MapControls } from '@/components/map';

import { MapUser } from './map-user';

export const Map = () => {
  return (
    <MapContainer>
      <MapUser />
      <MapControls />
    </MapContainer>
  );
};
