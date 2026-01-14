import { IconFilter2, IconSearch } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

export const MapSearch = () => {
  return (
    <div className="absolute top-4 left-4 z-[1000]">
      <InputGroup className="w-full bg-white h-10">
        <InputGroupInput className="w-60" placeholder="Search by area..." />
        <InputGroupAddon align="inline-end">
          <Button variant="ghost" size="icon-sm" aria-label="Search">
            <IconSearch />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Filter">
            <IconFilter2 />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};
