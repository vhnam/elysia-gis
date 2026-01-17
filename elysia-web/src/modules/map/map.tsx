import { MapContainer, MapControls } from '@/components/map';

import { MapSearch } from './map-search';
import { MapUser } from './map-user';

export const Map = () => {
  return (
    <MapContainer>
      <MapSearch />
      <MapUser />
      <MapControls />
    </MapContainer>
  );
};
