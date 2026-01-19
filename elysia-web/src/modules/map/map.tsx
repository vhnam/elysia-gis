import { MapContainer, MapControls } from '@/components/map';

import { MapCreateRequestDialogTrigger } from './map-create-request-dialog-trigger';
import { MapSearch } from './map-search';
import { MapUser } from './map-user';

export const Map = () => {
  return (
    <MapContainer>
      <MapSearch />
      <MapUser />
      <MapControls />
      <MapCreateRequestDialogTrigger />
    </MapContainer>
  );
};
