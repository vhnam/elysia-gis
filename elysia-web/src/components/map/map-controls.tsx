import {
  IconArrowsMaximize,
  IconCurrentLocation,
  IconMinus,
  IconPlus,
} from '@tabler/icons-react';

import { useMap } from '@/hooks/use-map';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const MapControls = () => {
  const { onZoomIn, onZoomOut, onFullscreen, onCurrentLocation } = useMap();

  return (
    <div className="absolute bottom-12 right-2 z-[1000] flex flex-col gap-2">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button variant="outline" size="icon-sm" onClick={onFullscreen}>
              <IconArrowsMaximize />
            </Button>
          }
        />
        <TooltipContent side="right">
          <p>Fullscreen</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="outline"
              size="icon-sm"
              onClick={onCurrentLocation}
            >
              <IconCurrentLocation />
            </Button>
          }
        />
        <TooltipContent side="right">
          <p>Current Location</p>
        </TooltipContent>
      </Tooltip>

      <ButtonGroup orientation="vertical">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button variant="outline" size="icon-sm" onClick={onZoomIn}>
                <IconPlus />
              </Button>
            }
          />
          <TooltipContent side="right">
            <p>Zoom In</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button variant="outline" size="icon-sm" onClick={onZoomOut}>
                <IconMinus />
              </Button>
            }
          />
          <TooltipContent side="right">
            <p>Zoom Out</p>
          </TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </div>
  );
};
