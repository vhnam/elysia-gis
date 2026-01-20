import {
  IconAdjustmentsHorizontal,
  IconChartBar,
  IconTargetArrow,
  IconUrgent,
  IconX,
} from '@tabler/icons-react';
import { useState } from 'react';

import { AppLogo } from '@/components/app';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import {
  FilterGroupConfig,
  FilterOption,
  FilterSection,
} from './map-filter-section';

const urgencyColorClasses = {
  red: '[&[aria-pressed=true]]:bg-red-100 [&[aria-pressed=true]]:text-red-800 [&[aria-pressed=true]]:hover:bg-red-200 [&[aria-pressed=true]]:border-red-400',
  orange:
    '[&[aria-pressed=true]]:bg-orange-100 [&[aria-pressed=true]]:text-orange-800 [&[aria-pressed=true]]:hover:bg-orange-200 [&[aria-pressed=true]]:border-orange-400',
  yellow:
    '[&[aria-pressed=true]]:bg-yellow-100 [&[aria-pressed=true]]:text-yellow-800 [&[aria-pressed=true]]:hover:bg-yellow-200 [&[aria-pressed=true]]:border-yellow-400',
  blue: '[&[aria-pressed=true]]:bg-blue-100 [&[aria-pressed=true]]:text-blue-800 [&[aria-pressed=true]]:hover:bg-blue-200 [&[aria-pressed=true]]:border-blue-400',
} as const;

const typeColorClasses =
  '[&[aria-pressed=true]]:bg-secondary [&[aria-pressed=true]]:text-secondary-foreground [&[aria-pressed=true]]:hover:bg-secondary/80 [&[aria-pressed=true]]:border-secondary';

const statusColorClasses =
  '[&[aria-pressed=true]]:bg-accent [&[aria-pressed=true]]:text-accent-foreground [&[aria-pressed=true]]:hover:bg-accent/80 [&[aria-pressed=true]]:border-accent';

const urgencyOptions: FilterOption[] = [
  {
    value: 'critical',
    label: 'Critical',
    color: urgencyColorClasses.red,
    total: 10,
  },
  {
    value: 'high',
    label: 'High',
    color: urgencyColorClasses.orange,
    total: 20,
  },
  {
    value: 'medium',
    label: 'Medium',
    color: urgencyColorClasses.yellow,
    total: 30,
  },
  {
    value: 'low',
    label: 'Low',
    color: urgencyColorClasses.blue,
    total: 40,
  },
];

const typeOptions: FilterOption[] = [
  {
    value: 'people',
    label: 'People Rescue',
    total: 10,
    color: typeColorClasses,
  },
  { value: 'medical', label: 'Medical', total: 20, color: typeColorClasses },
  { value: 'food', label: 'Food & Water', total: 30, color: typeColorClasses },
  { value: 'supplies', label: 'Supplies', total: 40, color: typeColorClasses },
  { value: 'shelter', label: 'Shelter', total: 50, color: typeColorClasses },
  {
    value: 'transportation',
    label: 'Transportation',
    total: 60,
    color: typeColorClasses,
  },
];

const statusOptions: FilterOption[] = [
  { value: 'new', label: 'New', total: 10, color: statusColorClasses },
  {
    value: 'in-progress',
    label: 'In Progress',
    total: 20,
    color: statusColorClasses,
  },
  {
    value: 'resolved',
    label: 'Resolved',
    total: 40,
    color: statusColorClasses,
  },
];

const filterGroups: FilterGroupConfig[] = [
  {
    id: 'urgency-toggle-group',
    label: 'Urgency level',
    icon: <IconUrgent />,
    options: urgencyOptions,
    variant: 'outline',
  },
  {
    id: 'type-toggle-group',
    label: 'Type',
    icon: <IconTargetArrow />,
    options: typeOptions,
    variant: 'outline',
  },
  {
    id: 'status-toggle-group',
    label: 'Status',
    icon: <IconChartBar />,
    options: statusOptions,
    variant: 'outline',
  },
];

export const MapFilterDrawer = () => {
  const [filterValues, setFilterValues] = useState<Record<string, string[]>>({
    'urgency-toggle-group': [],
    'type-toggle-group': [],
    'status-toggle-group': [],
  });

  const hasActiveFilters = Object.values(filterValues).some(
    (values) => values.length > 0,
  );

  const totalActiveFilters = Object.values(filterValues).flat().length;

  const handleToggleFilterValue = (name: string, value: string) => {
    setFilterValues((prev) => {
      const currentValues = prev[name] || [];
      const isSelected = currentValues.includes(value);

      return {
        ...prev,
        [name]: isSelected
          ? currentValues.filter((currentValue) => currentValue !== value)
          : [...currentValues, value],
      };
    });
  };

  const handleResetAllFilters = () => {
    setFilterValues({
      'urgency-toggle-group': [],
      'type-toggle-group': [],
      'status-toggle-group': [],
    });
  };

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label="Filter">
          <IconAdjustmentsHorizontal />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="z-60 !rounded-none">
        <DrawerHeader>
          <div className="flex items-center justify-between mb-2">
            <DrawerTitle className="flex items-center gap-2">
              <AppLogo size={16} withText={false} />
              <span>Filter Rescue Requests</span>
            </DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Close">
                <IconX className="size-4" />
              </Button>
            </DrawerClose>
          </div>
          <DrawerDescription>
            Refine your search to find specific types of rescue requests
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-0 space-y-6 md:space-y-8">
          {filterGroups.map((group) => (
            <FilterSection
              key={group.id}
              config={group}
              filterValues={filterValues[group.id]}
              onToggleFilterValue={handleToggleFilterValue}
            />
          ))}
        </div>
        <DrawerFooter>
          <Button variant="default" className="w-full">
            Apply Filters
            {hasActiveFilters && (
              <Badge
                className="bg-white text-primary ml-2"
                aria-label={`${totalActiveFilters} active filters`}
              >
                {totalActiveFilters}
              </Badge>
            )}
          </Button>
          {hasActiveFilters && (
            <Button
              variant="outline"
              className="w-full"
              onClick={handleResetAllFilters}
            >
              Reset All Filters
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
