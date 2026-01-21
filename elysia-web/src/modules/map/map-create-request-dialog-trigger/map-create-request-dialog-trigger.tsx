import { IconSos } from '@tabler/icons-react';

import { cn } from '@/utils/ui';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { MapCreateRequestForm } from './map-create-request-form';

export const MapCreateRequestDialogTrigger = () => {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="destructive"
            className={cn(
              'absolute bottom-2 left-2 md:top-2 md:left-80 md:bottom-[unset] z-10',
              'bg-destructive text-destructive-foreground space-x-2',
            )}
          >
            <IconSos className="hidden md:block" />
            Create Request
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Rescue Request</DialogTitle>
          <DialogDescription>
            Create a new rescue request to help someone or by yourself in case
            of emergency.
          </DialogDescription>
        </DialogHeader>
        <MapCreateRequestForm />
      </DialogContent>
    </Dialog>
  );
};
