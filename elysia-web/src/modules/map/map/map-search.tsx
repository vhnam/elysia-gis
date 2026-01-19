import { IconSearch } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

import { MapFilterDrawer } from './map-filter-drawer';

export const MapSearch = () => {
  return (
    <div className="absolute top-2 left-2 z-10">
      <InputGroup className="w-full bg-white md:h-8">
        <InputGroupAddon align="inline-start">
          <SidebarTrigger className="md:hidden" />
          <Separator orientation="vertical" className="md:hidden" />
          <Button variant="ghost" size="icon-sm" aria-label="Search">
            <IconSearch />
          </Button>
        </InputGroupAddon>
        <InputGroupInput
          className="w-40 md:w-60"
          placeholder="Search by area..."
        />
        <InputGroupAddon align="inline-end">
          <MapFilterDrawer />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};
