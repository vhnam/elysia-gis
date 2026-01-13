import { IconFilter, IconSearch } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';

export const MapSearch = () => {
  return (
    <div className="absolute top-4 left-4 z-[1000]">
      <InputGroup className="w-full bg-white p-2">
        <InputGroupInput placeholder="Search by area..." />
        <InputGroupAddon align="inline-end">
          <ButtonGroup orientation="horizontal">
            <InputGroupButton variant="outline">
              <IconSearch />
            </InputGroupButton>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <InputGroupButton variant="outline" aria-label="More Options">
                    <IconFilter />
                  </InputGroupButton>
                }
              />
              <DropdownMenuContent>
                <DropdownMenuItem>Filter by Priority</DropdownMenuItem>
                <DropdownMenuItem>Filter by Status</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};
