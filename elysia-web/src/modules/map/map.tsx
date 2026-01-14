
import { MapSearch } from './map-search';
import { MapUser } from './map-user';
import { MapContainer, MapControls } from '@/components/map';

export const Map = () => {
  return (
    <MapContainer>
      <MapSearch />
      <MapUser />
      <MapControls />
    </MapContainer>
  );
};
