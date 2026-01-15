import { createFileRoute } from '@tanstack/react-router';

import { useMap } from '@/hooks/use-map';

import { AppSidebar } from '@/components/app';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { Map, MapLoader } from '@/modules/map';

export const Route = createFileRoute('/')({ component: App });

function App() {
  const { mapInstance } = useMap();

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <Map />
        {!mapInstance && <MapLoader />}
      </SidebarInset>
    </SidebarProvider>
  );
}
