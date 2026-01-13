import { createFileRoute } from '@tanstack/react-router';

import { useMap } from '@/hooks/use-map/use-map';

import { Map, MapLoader } from '@/modules/map';

export const Route = createFileRoute('/')({ component: App });

function App() {
  const { mapInstance } = useMap();

  return (
    <div className="relative h-screen w-full">
      <Map />
      {!mapInstance && <MapLoader />}
    </div>
  );
}
