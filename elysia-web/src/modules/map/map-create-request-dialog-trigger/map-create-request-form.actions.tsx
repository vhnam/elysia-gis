import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';

import {
  type MapCreateRequestForm,
  mapCreateRequestSchema,
} from '@/schemas/map.schema';

import { useCreateRescueRequestMutation } from '@/queries/rescue-request';

interface UseMapCreateRequestActionsProps {
  defaultValues: MapCreateRequestForm;
  onSuccess?: () => void;
}

export const useMapCreateRequestActions = ({
  defaultValues,
  onSuccess,
}: UseMapCreateRequestActionsProps) => {
  const createRescueRequestMutation = useCreateRescueRequestMutation();

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: mapCreateRequestSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await createRescueRequestMutation.mutateAsync({
          name: value.name,
          email: value.email,
          phone: value.phone,
          address: value.address,
          requestType: value.requestType,
          description: value.description,
          longitude: value.longitude,
          latitude: value.latitude,
        });
        toast.success('Request created successfully');
        onSuccess?.();
      } catch (error) {
        if (error instanceof Error && !error.message.includes('Network')) {
          toast.error(error.message);
        }
      }
    },
  });

  return {
    form,
  };
};
