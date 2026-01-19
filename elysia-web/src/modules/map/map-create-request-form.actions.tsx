import { useForm } from '@tanstack/react-form';

import { mapCreateRequestSchema } from '@/schemas/map.schema';

export const useMapCreateRequestActions = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      requestType: '',
      description: '',
    },
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
