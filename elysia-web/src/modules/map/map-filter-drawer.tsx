import { IconAdjustmentsHorizontal } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

const MapFilterDrawer = () => {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label="Filter">
          <IconAdjustmentsHorizontal />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="z-60 !rounded-none">
        <DrawerHeader>
          <DrawerTitle>Filter</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default MapFilterDrawer;
