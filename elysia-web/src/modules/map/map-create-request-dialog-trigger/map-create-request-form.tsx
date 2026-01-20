import { Activity, startTransition, useEffect, useState } from 'react';

import { useMap } from '@/hooks/use-map';

import { type RequestType } from '@/schemas/map.schema';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { useMapCreateRequestActions } from '@/modules/map/map-create-request-dialog-trigger';
import { MapReview } from '@/modules/map/map-review';

const requestTypeOptions = [
  { value: 'people', label: 'People Rescue' },
  { value: 'medical', label: 'Medical' },
  { value: 'food', label: 'Food & Water' },
  { value: 'supplies', label: 'Supplies' },
  { value: 'shelter', label: 'Shelter' },
  { value: 'transportation', label: 'Transportation' },
];

export const MapCreateRequestForm = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasUserSetLocation, setHasUserSetLocation] = useState(false);

  const { center } = useMap();

  const { form } = useMapCreateRequestActions({
    defaultValues: {
      name: '',
      email: undefined,
      phone: '',
      address: undefined,
      requestType: 'food',
      description: undefined,
      latitude: center?.latitude ?? 0,
      longitude: center?.longitude ?? 0,
    },
  });

  const { handleSubmit, setFieldValue, Field: FormField, state } = form;

  useEffect(() => {
    if (center && !hasUserSetLocation) {
      const lat = center.latitude ?? 0;
      const lng = center.longitude ?? 0;
      if (lat !== 0 && lng !== 0) {
        setFieldValue('latitude', lat);
        setFieldValue('longitude', lng);
      }
    }
  }, [center, setFieldValue, hasUserSetLocation]);

  const handleDragEnd = (latitude: number, longitude: number) => {
    setFieldValue('latitude', latitude);
    setFieldValue('longitude', longitude);
    setHasUserSetLocation(true);
  };

  const handleCancelEditMode = () => {
    if (center) {
      const lat = center.latitude ?? 0;
      const lng = center.longitude ?? 0;
      setFieldValue('latitude', lat);
      setFieldValue('longitude', lng);
    }
    setHasUserSetLocation(false);
    setIsEditMode(false);
  };

  return (
    <>
      <Activity mode={isEditMode ? 'hidden' : 'visible'}>
        <form
          className="relative"
          onSubmit={(e) => {
            e.preventDefault();
            startTransition(() => {
              handleSubmit();
            });
          }}
        >
          <FieldGroup className="mb-12 no-scrollbar overflow-y-auto h-[70vh]">
            <FormField name="name">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    type="text"
                    placeholder="Enter your name…"
                    required
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </FormField>
            <FormField name="email">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Email{' '}
                    <span className="text-xs text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    type="email"
                    placeholder="Enter your email…"
                    autoComplete="email"
                    inputMode="email"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </FormField>
            <FormField name="phone">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    type="tel"
                    placeholder="Enter your phone…"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </FormField>
            <FormField name="address">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Address{' '}
                    <span className="text-xs text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Enter your address…"
                    className="resize-none"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </FormField>
            <FormField name="requestType">
              {(field) => (
                <Field>
                  <FieldLabel>Request Type</FieldLabel>
                  <Select
                    items={requestTypeOptions}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(value) =>
                      field.handleChange(value as RequestType)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a request type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {requestTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </FormField>
            <FormField name="description">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Description{' '}
                    <span className="text-xs text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Enter your request description…"
                    className="resize-none"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </FormField>
            <MapReview
              latitude={state.values.latitude ?? center?.latitude ?? 0}
              longitude={state.values.longitude ?? center?.longitude ?? 0}
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
            />
          </FieldGroup>
          <div className="absolute bottom-0 left-0 right-0 flex justify-end gap-2 bg-background">
            <DialogClose render={<Button variant="outline" />}>
              Cancel
            </DialogClose>
            <Button type="submit" disabled={state.isSubmitting}>
              {state.isSubmitting ? 'Creating…' : 'Create'}
            </Button>
          </div>
        </form>
      </Activity>
      <Activity mode={isEditMode ? 'visible' : 'hidden'}>
        <div className="relative">
          <MapReview
            latitude={state.values.latitude ?? center?.latitude ?? 0}
            longitude={state.values.longitude ?? center?.longitude ?? 0}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            onDragEnd={handleDragEnd}
          />
          <div className="absolute bottom-0 left-0 right-0 flex justify-end gap-2 bg-background">
            <Button
              variant="outline"
              type="button"
              onClick={handleCancelEditMode}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              type="button"
              onClick={() => setIsEditMode(false)}
            >
              Save
            </Button>
          </div>
        </div>
      </Activity>
    </>
  );
};
