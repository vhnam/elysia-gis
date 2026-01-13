import {
  IconArrowsMaximize,
  IconCurrentLocation,
  IconMinus,
  IconPlus,
} from '@tabler/icons-react';

import { useMap } from '@/hooks/use-map';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';

export const MapControls = () => {
  const { onZoomIn, onZoomOut, onFullscreen, onCurrentLocation } = useMap();

  return (
    <div className="absolute bottom-12 right-2 z-[1000] flex flex-col gap-2">
      <Button variant="outline" size="icon-sm" onClick={onFullscreen}>
        <IconArrowsMaximize />
      </Button>
      <Button variant="outline" size="icon-sm" onClick={onCurrentLocation}>
        <IconCurrentLocation />
      </Button>
      <ButtonGroup orientation="vertical">
        <Button variant="outline" size="icon-sm" onClick={onZoomIn}>
          <IconPlus />
        </Button>
        <Button variant="outline" size="icon-sm" onClick={onZoomOut}>
          <IconMinus />
        </Button>
      </ButtonGroup>
    </div>
  );
};
