import { useForm } from '@tanstack/react-form';

import {
  type MapCreateRequestForm,
  mapCreateRequestSchema,
} from '@/schemas/map.schema';

interface UseMapCreateRequestActionsProps {
  defaultValues: MapCreateRequestForm;
}

export const useMapCreateRequestActions = ({
  defaultValues,
}: UseMapCreateRequestActionsProps) => {
  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: mapCreateRequestSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return {
    form,
  };
};
